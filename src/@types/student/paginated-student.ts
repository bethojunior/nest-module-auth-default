import { StudentEntity } from 'src/modules/student/entities/student.entity';

export interface PaginatedStudents {
  students: StudentEntity[];
  total: number;
}
