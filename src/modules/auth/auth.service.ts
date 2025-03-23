import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { RoleEnum } from 'src/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<User | Error> {
    const { email } = createAuthDto;

    const existingUser = await this.findOneByEmail(email);

    if (existingUser) throw new Error('Email already exists');

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

    return this.prisma.user.create({
      data: {
        email: createAuthDto.email,
        password: hashedPassword,
        name: createAuthDto.name,
      },
    });
  }

  async login({
    loginAuthDto,
  }: {
    loginAuthDto: LoginAuthDto;
  }): Promise<{ accessToken: string; user: UserEntity }> {
    const user = await this.findOneByEmail(loginAuthDto.email);

    const isPasswordValid = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return {
      user: {
        ...userWithoutPassword,
        role: user.role as RoleEnum,
      } as UserEntity,
      accessToken,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateAuthDto,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
