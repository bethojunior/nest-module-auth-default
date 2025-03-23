import { ClassEntity } from 'src/modules/class/entities/class.entity';

export interface PaginatedClass {
  classes: ClassEntity[];
  total: number;
}
