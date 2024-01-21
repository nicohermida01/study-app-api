import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ReqUserJwt } from '../auth/decorators/req-user-jwt.decorator';
import { UserDocument } from '../user/schemas/user.schema';
import { CreateProfessorDto } from './dtos/createProfessor.dto';
import { ProfessorGuard } from './guards/professor.guard';
import { ReqProfessor } from './decorators/req-professor.decorator';
import { ProfessorDocument } from './schemas/professor.schema';
import { SpecializationService } from '../specialization/specialization.service';
import { TeachesService } from '../teaches/teaches.service';
import { ICLassroomSerialized } from '../classroom/interfaces/classroomSerialized.interface';
import { CourseService } from '../course/course.service';

@Controller('professor')
export class ProfessorController {
  constructor(
    private professorService: ProfessorService,
    private specializationService: SpecializationService,
    private teachesService: TeachesService,
    private courseService: CourseService,
  ) {}

  /**
   * Devuelve todas las classroomTeaches asociadas con el profesor en el access_token
   */
  @Get('teaches')
  @UseGuards(JwtGuard, ProfessorGuard)
  async getTeaches(@ReqProfessor() professor: ProfessorDocument) {
    const teachesPopulated =
      await this.teachesService.findAllByProfessorIdAndPopulateClass(
        professor._id,
      );

    const classroomsSerialized: ICLassroomSerialized[] = await Promise.all(
      teachesPopulated.map(async (item) => {
        const relatedTeache = await this.teachesService.findByClassroomId(
          item.classroom._id,
        );
        const relatedProfessor =
          await this.professorService.findByIdAndPopulateUser(
            relatedTeache.professor,
          );

        const allCourses = await this.courseService.findAllByClassroomId(
          item.classroom._id,
        );

        const serialize: ICLassroomSerialized = {
          name: item.classroom.name,
          description: item.classroom.description,
          subject: item.classroom.subject.name,
          professor: `${relatedProfessor.user.lastName} ${relatedProfessor.user.firstName}`,
          id: item.classroom._id.toHexString(),
          membersCount: allCourses.length,
        };

        return serialize;
      }),
    );

    return classroomsSerialized;
  }

  /**
   * Devuelve los subjects relacionados con el profesor en el access_token
   */
  @Get('subjects')
  @UseGuards(JwtGuard, ProfessorGuard)
  async getSubjects(@ReqProfessor() professor: ProfessorDocument) {
    const specializationsPopulated =
      await this.specializationService.findAllByProfessorIdAndPopulateSubject(
        professor._id,
      );

    return specializationsPopulated.map((item) => ({
      name: item.subject.name,
      id: item.subject._id.toHexString(),
    }));
  }

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
