import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClassDto } from './dto/update-class.dto';
import { PaginatedClass } from 'src/@types/class/paginated-class';
import { ClassEntity } from './entities/class.entity';
import { RoleEnum } from 'src/enums/role.enum';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClassDto): Promise<ClassEntity> {
    try {
      return await this.prisma.class.create({ data });
    } catch (error) {
      throw new Error(`Erro ao criar a classe: ${error.message}`);
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<PaginatedClass> {
    try {
      const skip = (page - 1) * limit;

      const [classes, total] = await this.prisma.$transaction([
        this.prisma.class.findMany({
          include: { author: true },
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
        }),
        this.prisma.class.count(),
      ]);

      return { classes, total };
    } catch (error) {
      throw new Error(`Erro ao buscar as classes: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<ClassEntity | null> {
    try {
      const classItem = await this.prisma.class.findUnique({ where: { id } });

      if (!classItem) throw new Error('Classe não encontrada');

      return classItem;
    } catch (error) {
      throw new Error(`Erro ao buscar a classe: ${error.message}`);
    }
  }

  async update(id: string, data: UpdateClassDto): Promise<ClassEntity> {
    try {
      return await this.prisma.class.update({ where: { id }, data });
    } catch (error) {
      throw new Error(`Erro ao atualizar a classe: ${error.message}`);
    }
  }

  async remove(id: string): Promise<ClassEntity> {
    try {
      return await this.prisma.class.update({
        where: { id },
        data: {
          deleted_at: new Date(),
          isActive: false,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao remover a classe: ${error.message}`);
    }
  }
}
