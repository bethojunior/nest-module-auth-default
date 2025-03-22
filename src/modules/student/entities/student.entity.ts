import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface StudentEntity {
  id: string;
  userId: string;
  classId: string;

  user?: UserEntity;

  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}
