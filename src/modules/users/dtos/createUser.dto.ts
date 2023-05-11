import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
