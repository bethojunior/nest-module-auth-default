import { EnterpriseEntity } from 'src/shared/entities/enterprise.entity';

export interface PaginatedEnterprises {
  enterprises: EnterpriseEntity[];
  total: number;
}
