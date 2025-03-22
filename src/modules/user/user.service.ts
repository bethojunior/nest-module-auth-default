import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './user.repository';
import { IUserFilter, IPaginatedUsers } from 'src/@types/user/paginated-users';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<IPaginatedUsers | Error | string> {
    try {
      return await this.repository.findAll(page, limit);
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }

  async findOne(id: string): Promise<IUserFilter | Error | string> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUserFilter | Error | string> {
    try {
      return await this.repository.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }

  async remove(id: string): Promise<IUserFilter | Error | string> {
    try {
      return await this.repository.remove(id);
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }
}
