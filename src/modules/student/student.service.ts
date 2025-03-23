import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from './student.repository';
import { StudentEntity } from './entities/student.entity';
import { PaginatedStudents } from 'src/@types/student/paginated-student';

@Injectable()
export class StudentService {
  constructor(private readonly repository: StudentRepository) {}
  async create(
    createStudentDto: CreateStudentDto,
  ): Promise<StudentEntity | Error> {
    try {
      return await this.repository.createStudent(createStudentDto);
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async findAll(): Promise<PaginatedStudents | Error> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async findOne(id: string): Promise<StudentEntity | Error> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentEntity | Error> {
    try {
      return await this.repository.update(id, updateStudentDto);
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async remove(id: string): Promise<StudentEntity | Error> {
    try {
      return await this.repository.remove(id);
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }
}
