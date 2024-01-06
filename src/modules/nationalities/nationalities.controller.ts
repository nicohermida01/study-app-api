import { Body, Controller, Get, Post } from '@nestjs/common';
import { NationalitiesService } from './nationalities.service';
import { CreateNationalityDto } from './dtos/createNationality.dto';

@Controller('nationalities')
export class NationalitiesController {
  constructor(private readonly nationalitiesService: NationalitiesService) {}

  @Post()
  async createNationality(@Body() dto: CreateNationalityDto) {
    const newNationality = await this.nationalitiesService.create(dto);

    return newNationality;
  }

  @Get()
  async getAllNationalities() {
    const allNationalities = await this.nationalitiesService.findAll();

    return allNationalities;
  }
}
