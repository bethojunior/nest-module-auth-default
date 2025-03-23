import { ClassEntity } from './class.entity';
import { UserEntity } from './user.entity';

export interface StudentEntity {
  id: string;
  userId: string;
  classId: string;

  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;

  user?: UserEntity;
  class?: ClassEntity;
}
