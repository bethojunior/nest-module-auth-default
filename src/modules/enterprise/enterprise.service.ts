import { Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { EnterpriseRepository } from './enterprise.repository';
import { EnterpriseEntity } from './entities/enterprise.entity';
import { PaginatedEnterprises } from 'src/@types/enterprise/paginated-enterprise';

@Injectable()
export class EnterpriseService {
  constructor(private readonly repository: EnterpriseRepository) {}
  async create(
    createEnterpriseDto: CreateEnterpriseDto,
  ): Promise<EnterpriseEntity | Error> {
    try {
      return await this.repository.store(createEnterpriseDto);
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedEnterprises | Error> {
    try {
      return await this.repository.findAll(page, limit);
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async findOne(id: string): Promise<EnterpriseEntity | Error> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async update(
    id: string,
    updateEnterpriseDto: UpdateEnterpriseDto,
  ): Promise<EnterpriseEntity | Error> {
    try {
      return await this.repository.update(id, updateEnterpriseDto);
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async remove(id: string): Promise<EnterpriseEntity | Error> {
    try {
      return await this.repository.remove(id);
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }
}
