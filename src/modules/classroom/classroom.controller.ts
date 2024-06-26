import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ProfessorGuard } from '../professor/guards/professor.guard';
import { ReqProfessor } from '../professor/decorators/req-professor.decorator';
import { ProfessorDocument } from '../professor/schemas/professor.schema';
import { CreateClassroomDto } from './dtos/createClassroom.dto';
import { TeachesService } from '../teaches/teaches.service';
import { ClassroomService } from './classroom.service';
import { ReqUserJwt } from '../auth/decorators/req-user-jwt.decorator';
import { UserDocument } from '../user/schemas/user.schema';
import { ClassroomGuard } from './guards/classroom.guard';
import { ReqClassroom } from './decorators/req-classroom.decorator';
import { ClassroomDocument } from './schemas/classroom.schema';
import { CourseService } from '../course/course.service';
import { ProfessorService } from '../professor/professor.service';
import { UNAUTHORIZED, USER_NOT_IN_CLASSROOM } from 'src/ssot/errorCodes';
import { ICourseRequest } from '../course/interfaces/courseRequest.interface';
import { CourseDocument } from '../course/schemas/course.schema';
import { CourseGuard } from '../course/guards/course.guard';
import { ReqCourseParam } from '../course/decorators/req-course.decorator';

@Controller('classroom')
export class ClassroomController {
  constructor(
    private classroomService: ClassroomService,
    private teachesService: TeachesService,
    private courseService: CourseService,
    private professorService: ProfessorService,
  ) {}

  /**
   * Cambia el estado del course relacionado con el id en queryParams a "Reject"
   */
  @Post('request/reject/:id')
  @UseGuards(JwtGuard, ProfessorGuard, CourseGuard)
  async rejectRequest(@ReqCourseParam() course: CourseDocument) {
    return await this.courseService.reject(course._id);
  }

  /**
   * Cambia el estado del course relacionado con el id en queryParams a "Accept"
   */
  @Post('request/accept/:id')
  @UseGuards(JwtGuard, ProfessorGuard, CourseGuard)
  async acceptRequest(@ReqCourseParam() course: CourseDocument) {
    return await this.courseService.accept(course._id);
  }

  /**
   * Devuelve las coursesRequest (status === pending) de la classroom asociada al queryParams id
   */
  @Get('requests/:id')
  @UseGuards(JwtGuard, ProfessorGuard, ClassroomGuard)
  async getRequests(
    @ReqClassroom() classroom: ClassroomDocument,
  ): Promise<ICourseRequest[]> {
    const courseRequests = await this.courseService.findAllPendingForClassroom(
      classroom._id,
    );

    return courseRequests.map((item) => {
      const req: ICourseRequest = {
        name: `${item.user.firstName} ${item.user.lastName}`,
        courseId: item._id.toHexString(),
        username: item.user.username,
      };

      return req;
    });
  }

  /**
   * Verifica que el profesor en el access_token sea el profesor correspondiente con el classroom relacionado con el id en queryParams
   */
  @Get('professor/auth/:id')
  @UseGuards(JwtGuard, ProfessorGuard, ClassroomGuard)
  async authenticateProfessor(
    @ReqProfessor() professor: ProfessorDocument,
    @ReqClassroom() classroom: ClassroomDocument,
  ) {
    const teache = await this.teachesService.findByClassIdAndProfessorId(
      classroom._id,
      professor._id,
    );

    if (!teache) throw new UnauthorizedException(UNAUTHORIZED);

    return teache;
  }

  /**
   * Verifica que el usuario tenga una relacion (Course o Teaches) con el Classroom.
   */
  @Get('auth/:id')
  @UseGuards(JwtGuard, ClassroomGuard)
  async authenticateUser(
    @ReqUserJwt() user: UserDocument,
    @ReqClassroom() classroom: ClassroomDocument,
  ) {
    const course = await this.courseService.findByClassAndUserId(
      classroom._id,
      user._id,
    );

    if (!course) {
      const professor = await this.professorService.findByUserId(user._id);

      if (professor) {
        const teaches = await this.teachesService.findByClassIdAndProfessorId(
          classroom._id,
          professor._id,
        );

        if (!teaches) throw new UnauthorizedException(USER_NOT_IN_CLASSROOM);
      }
    }

    return {
      classroom,
      rol: !!course ? 'Student' : 'Professor',
    };
  }

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
