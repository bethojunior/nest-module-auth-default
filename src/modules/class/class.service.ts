import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassRepository } from './class.repository';
import { ClassEntity } from './entities/class.entity';
import { PaginatedClass } from 'src/@types/class/paginated-class';
import { istanceError } from 'src/helpers/errror.helper';

@Injectable()
export class ClassService {
  constructor(private readonly repository: ClassRepository) {}

  async create(createClassDto: CreateClassDto): Promise<ClassEntity | Error> {
    try {
      return await this.repository.create(createClassDto);
    } catch (error) {
      return istanceError(error);
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedClass | Error> {
    try {
      return await this.repository.findAll(page, limit);
    } catch (error) {
      return istanceError(error);
    }
  }

  async findOne(id: string): Promise<ClassEntity | Error> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      return istanceError(error);
    }
  }

  async update(
    id: string,
    updateClassDto: UpdateClassDto,
  ): Promise<ClassEntity | Error> {
    try {
      return await this.repository.update(id, updateClassDto);
    } catch (error) {
      return istanceError(error);
    }
  }

  async remove(id: string): Promise<ClassEntity | Error> {
    try {
      return await this.repository.remove(id);
    } catch (error) {
      return istanceError(error);
    }
  }
}
