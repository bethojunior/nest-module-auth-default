import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateEnterpriseDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(18)
  @MaxLength(18)
  cnpj: string;
}
