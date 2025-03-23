import { UserEntity } from './user.entity';

export interface ClassEntity {
  name: string;
  code: string;
  isActive: boolean;
  authorId: string;

  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;

  author?: UserEntity;
}
