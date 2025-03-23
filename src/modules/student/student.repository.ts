import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './entities/student.entity';
import { PaginatedStudents } from 'src/@types/student/paginated-student';

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

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedStudents> {
    const skip = (page - 1) * limit;

    const [students, total] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.enterprise.count(),
    ]);

    return { students, total };
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
