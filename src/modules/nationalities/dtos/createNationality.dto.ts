import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNationalityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export interface ICreateNationalityDto extends CreateNationalityDto {}
