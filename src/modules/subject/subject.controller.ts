import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateSubjectDto } from './dtos/createSubject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  /**
   * Crea tantas entidades Subject como elementos del array en el dto
   */
  @Post()
  async createMany(@Body() dto: CreateSubjectDto) {
    return await this.subjectService.createMany(
      dto.names.map((item) => ({ name: item })),
    );
  }

  /**
   * Retorna todas los Subject registrados
   */
  @Get('all')
  async getAll() {
    return await this.subjectService.findAll();
  }

  /**
   * Retorna los Subject registrados segun el filtro de la paginación
   */
  @Get('all/pagination')
  async getAllWithPagination(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const pagination = await this.subjectService.findAllWithPagination(
      {},
      {
        limit,
        offset,
      },
    );

    return pagination;
  }
}
