import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginatedUsers, IUserFilter } from 'src/@types/user/paginated-users';
import { RoleEnum } from 'src/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<IPaginatedUsers> {
    const skip = (page - 1) * limit;

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        include: {
          enterprise: true,
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    const usersFormatted: IUserFilter[] = users.map(
      ({ password, ...user }) => ({
        ...user,
        role: user.role as RoleEnum,
      }),
    );

    return { users: usersFormatted, total };
  }

  async findOne(id: string): Promise<IUserFilter | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        enterprise: true,
      },
    });

    if (!user) return null;

    const { password, ...userWithoutPassword } = user;

    return { ...userWithoutPassword, role: user.role as RoleEnum };
  }

  async update(id: string, data: Partial<UpdateUserDto>): Promise<IUserFilter> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        enterprise: true,
      },
    });

    const { password, ...userWithoutPassword } = user;

    return { ...userWithoutPassword, role: user.role as RoleEnum };
  }

  async remove(id: string): Promise<IUserFilter> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        isActive: false,
      },
      include: {
        enterprise: true,
      },
    });

    const { password, ...userWithoutPassword } = user;

    return { ...userWithoutPassword, role: user.role as RoleEnum };
  }
}
