import { ClassEntity } from 'src/shared/entities/class.entity';

export interface PaginatedClass {
  classes: ClassEntity[];
  total: number;
}
