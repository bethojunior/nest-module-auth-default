import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { EnterpriseEntity } from 'src/shared/entities/enterprise.entity';
import { PaginatedEnterprises } from 'src/@types/enterprise/paginated-enterprise';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@Injectable()
export class EnterpriseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async store(data: CreateEnterpriseDto): Promise<EnterpriseEntity> {
    return await this.prisma.enterprise.create({
      data,
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedEnterprises> {
    const skip = (page - 1) * limit;

    const [enterprises, total] = await this.prisma.$transaction([
      this.prisma.enterprise.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.enterprise.count(),
    ]);

    return { enterprises, total };
  }

  async findOne(id: string): Promise<EnterpriseEntity> {
    return await this.prisma.enterprise.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: UpdateEnterpriseDto,
  ): Promise<EnterpriseEntity> {
    return await this.prisma.enterprise.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<EnterpriseEntity> {
    return await this.prisma.enterprise.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
