import { RoleEnum } from 'src/enums/role.enum';
import { EnterpriseEntity } from 'src/modules/enterprise/entities/enterprise.entity';

interface UserFindAll {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: RoleEnum;
  enterpriseId: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  enterprise: EnterpriseEntity | null;
}

interface PaginatedUsers {
  users: UserFindAll[];
  total: number;
}

export { UserFindAll, PaginatedUsers };
