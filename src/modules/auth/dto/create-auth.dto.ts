import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import { RoleEnum } from 'src/enums/role.enum';

export class CreateAuthDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  role: RoleEnum;

  @IsOptional()
  @IsUUID()
  enterpriseId: string;
}
