import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // remember ????
}
