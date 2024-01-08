import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { NationalitiesService } from './nationalities.service';
import { CreateNationalityDto } from './dtos/createNationality.dto';
import { Request } from 'express';

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

  @Get('pagination')
  async getNationalitiesWithPagination(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const pagination = await this.nationalitiesService.getWithPagiantion(
      {},
      {
        limit,
        offset,
      },
    );

    return pagination;
  }
}
