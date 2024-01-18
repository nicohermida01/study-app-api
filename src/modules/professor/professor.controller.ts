import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ReqUserJwt } from '../auth/decorators/req-user-jwt.decorator';
import { UserDocument } from '../user/schemas/user.schema';
import { CreateProfessorDto } from './dtos/createProfessor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private professorService: ProfessorService) {}

  /**
   * Retorna todos los profesores registrados
   */
  @Get('all')
  async getAll() {
    return await this.professorService.findAll();
  }

  /**
   * Crea la entidad Profesor con los datos del body y el id del usuario en el access_token. Lo guarda en la DB y retorna la nueva entidad
   */
  @Post()
  @UseGuards(JwtGuard)
  async createOne(
    @ReqUserJwt() user: UserDocument,
    @Body() dto: CreateProfessorDto,
  ) {
    return await this.professorService.createOne(user._id, dto);
  }
}
