import { RoleEnum } from 'src/enums/role.enum';
import { EnterpriseEntity } from 'src/modules/enterprise/entities/enterprise.entity';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string;
  enterpriseId?: string | null;
  password?: string;

  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;

  accessToken?: string;

  enterprise?: EnterpriseEntity;
}
