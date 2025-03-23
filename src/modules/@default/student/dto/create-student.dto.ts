import { IsUUID, IsString } from 'class-validator';
export class CreateStudentDto {
  @IsString()
  @IsUUID()
  userId: string;

  @IsString()
  @IsUUID()
  classId: string;
}
