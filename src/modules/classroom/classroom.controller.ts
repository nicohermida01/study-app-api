import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ProfessorGuard } from '../professor/guards/professor.guard';
import { ReqProfessor } from '../professor/decorators/req-professor.decorator';
import { ProfessorDocument } from '../professor/schemas/professor.schema';
import { CreateClassroomDto } from './dtos/createClassroom.dto';
import { TeachesService } from '../teaches/teaches.service';
import { ClassroomService } from './classroom.service';

@Controller('classroom')
export class ClassroomController {
  constructor(
    private classroomService: ClassroomService,
    private teachesService: TeachesService,
  ) {}

  /**
   * Crea la entidad Classroom con los datos del body y crea la entidad Teaches con el profesor relacionado al usuario en el access_token.
   * @returns Retorna el codigo de classroom
   */
  @Post()
  @UseGuards(JwtGuard, ProfessorGuard)
  async create(
    @ReqProfessor() professor: ProfessorDocument,
    @Body() dto: CreateClassroomDto,
  ) {
    const classroom = await this.classroomService.create(dto);

    await this.teachesService.create(professor._id, classroom._id);

    // make a mongoose wrapper for validate all queries are done

    return classroom.code;
  }
}
