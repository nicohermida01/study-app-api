import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsMongoId()
  @IsNotEmpty()
  nationality: mongoose.Schema.Types.ObjectId;
}
