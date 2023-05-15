import {
  IsDateString,
  IsOptional,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCourseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsOptional()
  courseStartDate: Date;

  @IsDateString()
  @IsOptional()
  courseEndDate: Date;
}

export interface ICreateCourseDTO extends CreateCourseDTO {}
