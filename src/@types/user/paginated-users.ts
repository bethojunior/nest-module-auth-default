import { RoleEnum } from 'src/enums/role.enum';
import { EnterpriseEntity } from 'src/shared/entities/enterprise.entity';

interface IUserFilter {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: RoleEnum;
  enterpriseId: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  enterprise: EnterpriseEntity | null;
}

interface IPaginatedUsers {
  users: IUserFilter[];
  total: number;
}

export { IUserFilter, IPaginatedUsers };
