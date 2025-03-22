import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface EnterpriseEntity {
  id: string;
  name: string;
  email: string;
  cnpj: string;

  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;

  user?: UserEntity;
}
