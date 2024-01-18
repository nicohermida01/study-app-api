import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateNationalityDto } from './dtos/createNationality.dto';
import { NationalityService } from './nationality.service';

@Controller('nationality')
export class NationalityController {
  constructor(private nationalityService: NationalityService) {}

  /**
   * Crea tantas entidades Nationality como elemntos del array en el body hayan
   */
  @Post()
  async createMany(@Body() dto: CreateNationalityDto) {
    return await this.nationalityService.createMAny(
      dto.names.map((item) => ({ name: item })),
    );
  }

  /**
   * Retorna todas las Nationalities registradas
   */
  @Get('all')
  async getAll() {
    return await this.nationalityService.findAll();
  }

  /**
   * Retorna las Nationalities registradas segun el filtro de la paginación
   */
  @Get('all/pagination')
  async getAllWithPagination(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const pagination = await this.nationalityService.findAllWithPagination(
      {},
      {
        limit,
        offset,
      },
    );

    return pagination;
  }
}
