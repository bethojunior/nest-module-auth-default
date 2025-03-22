import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './user.repository';
import { PaginatedUsers } from 'src/@types/user/paginated-users';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedUsers | Error | string> {
    try {
      return await this.repository.findAll(page, limit);
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
