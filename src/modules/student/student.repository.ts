import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './entities/student.entity';

@Injectable()
export class StudentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createStudent(data: CreateStudentDto): Promise<StudentEntity> {
    return await this.prisma.student.create({
      data: {
        ...data,
      },
    });
  }

  async findOne(id: string): Promise<StudentEntity> {
    return await this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<StudentEntity[]> {
    return await this.prisma.student.findMany();
  }

  async update(id: string, data: UpdateStudentDto): Promise<StudentEntity> {
    return await this.prisma.student.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async remove(id: string): Promise<StudentEntity> {
    return await this.prisma.student.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
