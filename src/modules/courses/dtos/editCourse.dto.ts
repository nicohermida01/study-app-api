import { IsOptional, IsString, IsDateString } from 'class-validator';

export class EditCourseDTO {
  @IsOptional()
  @IsString()
  name: string

  @IsDateString()
  @IsOptional()
  courseStartDate: Date;

  @IsDateString()
  @IsOptional()
  courseEndDate: Date;
}

export interface IEditCourseDTO extends EditCourseDTO {}