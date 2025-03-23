import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from './student.repository';
import { StudentEntity } from 'src/shared/entities/student.entity';
import { PaginatedStudents } from 'src/@types/student/paginated-student';
import { istanceError } from 'src/helpers/errror.helper';

@Injectable()
export class StudentService {
  constructor(private readonly repository: StudentRepository) {}
  async create(
    createStudentDto: CreateStudentDto,
  ): Promise<StudentEntity | Error> {
    try {
      return await this.repository.createStudent(createStudentDto);
    } catch (error) {
      return istanceError(error);
    }
  }

  async findAll(): Promise<PaginatedStudents | Error> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      return istanceError(error);
    }
  }

  async findOne(id: string): Promise<StudentEntity | Error> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      return istanceError(error);
    }
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentEntity | Error> {
    try {
      return await this.repository.update(id, updateStudentDto);
    } catch (error) {
      return istanceError(error);
    }
  }

  async remove(id: string): Promise<StudentEntity | Error> {
    try {
      return await this.repository.remove(id);
    } catch (error) {
      return istanceError(error);
    }
  }
}
