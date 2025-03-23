import { EnterpriseEntity } from 'src/modules/enterprise/entities/enterprise.entity';

export interface PaginatedEnterprises {
  enterprises: EnterpriseEntity[];
  total: number;
}
