import { StudentEntity } from 'src/shared/entities/student.entity';

export interface PaginatedStudents {
  students: StudentEntity[];
  total: number;
}
