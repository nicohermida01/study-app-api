import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateProfessorDto {
  @IsString()
  @IsNotEmpty()
  educationInfo: string;

  @IsArray()
  @IsMongoId({
    each: true,
  })
  @ArrayMinSize(1)
  subjectIds: Types.ObjectId[];
}
