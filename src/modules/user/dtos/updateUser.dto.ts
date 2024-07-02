import {
  IsDateString,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

import { Types } from 'mongoose';

export class updateUserDTO {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsMongoId()
  @IsOptional()
  nationality?: Types.ObjectId;
}
