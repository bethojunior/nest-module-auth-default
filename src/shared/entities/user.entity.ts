import { RoleEnum } from 'src/enums/role.enum';
import { EnterpriseEntity } from './enterprise.entity';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: string; //RoleEnum;
  enterpriseId?: string | null;
  password?: string;

  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;

  accessToken?: string;

  enterprise?: EnterpriseEntity;
}
