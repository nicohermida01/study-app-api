import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsArray()
  @IsString({
    each: true,
  })
  @ArrayMinSize(1)
  names: string[];
}
