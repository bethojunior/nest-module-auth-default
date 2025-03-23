import { IsUUID, IsString, IsBoolean } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsBoolean()
  isActive: boolean;

  @IsUUID()
  authorId: string;

  @IsString()
  code: string;
}
