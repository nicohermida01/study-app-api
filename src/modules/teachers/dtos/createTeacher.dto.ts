import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsNotEmpty()
  education: string;
}
