import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from './student.repository';
import { StudentEntity } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private readonly repository: StudentRepository) {}
  async create(
    createStudentDto: CreateStudentDto,
  ): Promise<StudentEntity | Error> {
    try {
      return await this.repository.createStudent(createStudentDto);
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }

  async findAll(): Promise<StudentEntity[] | Error> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }

  async findOne(id: string): Promise<StudentEntity | Error> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentEntity | Error> {
    try {
      return await this.repository.update(id, updateStudentDto);
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }

  async remove(id: string): Promise<StudentEntity | Error> {
    try {
      return await this.repository.remove(id);
    } catch (error) {
      if (error instanceof Error) return new Error(error.message);
      return error.message;
    }
  }
}
