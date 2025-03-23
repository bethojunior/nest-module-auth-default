import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './user.repository';
import { IUserFilter, IPaginatedUsers } from 'src/@types/user/paginated-users';
import { istanceError } from 'src/helpers/errror.helper';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<IPaginatedUsers | Error> {
    try {
      return await this.repository.findAll(page, limit);
    } catch (error) {
      return istanceError(error);
    }
  }

  async findOne(id: string): Promise<IUserFilter | Error | string> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      return istanceError(error);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUserFilter | Error | string> {
    try {
      return await this.repository.update(id, updateUserDto);
    } catch (error) {
      return istanceError(error);
    }
  }

  async remove(id: string): Promise<IUserFilter | Error | string> {
    try {
      return await this.repository.remove(id);
    } catch (error) {
      return istanceError(error);
    }
  }
}
