import { IsString, IsOptional, IsEmail } from 'class-validator';

export class EditUserDTO {
  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}

export interface IEditUserDTO extends EditUserDTO {}
