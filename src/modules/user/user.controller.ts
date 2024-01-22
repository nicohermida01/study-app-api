import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserParamIdGuard } from './guards/userParamId.guard';
import { ReqUserParam } from './decorators/req-user-param.decorator';
import { UserDocument } from './schemas/user.schema';
import { IProfileData } from './interfaces/profileData.interface';
import { UserService } from './user.service';
import { ReqUserJwt } from '../auth/decorators/req-user-jwt.decorator';
import { IUserPermissions } from './interfaces/permissions.interface';
import { NationalityService } from '../nationality/nationality.service';
import { CourseService } from '../course/course.service';
import { ClassroomService } from '../classroom/classroom.service';
import { ProfessorService } from '../professor/professor.service';
import { TeachesService } from '../teaches/teaches.service';
import { CreateCourseDto } from '../course/dtos/createCourse.dto';
import { CLASSROOM_NOT_FOUND } from 'src/ssot/errorCodes';
import { ICLassroomSerialized } from '../classroom/interfaces/classroomSerialized.interface';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private nationalityService: NationalityService,
    private courseService: CourseService,
    private classroomService: ClassroomService,
    private professorService: ProfessorService,
    private teachesService: TeachesService,
  ) {}

  /**
   * Crea la entidad Course con el usuario en el access_token y el classroom relacionado con el classroomCode en el dto
   */
  @Post('course')
  @UseGuards(JwtGuard)
  async createCourse(
    @Body() dto: CreateCourseDto,
    @ReqUserJwt() user: UserDocument,
  ) {
    const classroom = await this.classroomService.findByClassroomCode(
      dto.classroomCode,
    );

    if (!classroom) throw new BadRequestException(CLASSROOM_NOT_FOUND);

    return await this.courseService.createOne(user._id, classroom._id);
  }

  /**
   * Retorna todas las classroomsCourses asociadas con el usuario en el access_token
   */
  @Get('courses')
  @UseGuards(JwtGuard)
  async getCourses(@ReqUserJwt() user: UserDocument) {
    const coursesPoulated =
      await this.courseService.findAllByUserIdAndPopulateClass(user._id);

    const classroomsSerialized: ICLassroomSerialized[] = await Promise.all(
      coursesPoulated.map(async (item) => {
        const relatedTeache = await this.teachesService.findByClassroomId(
          item.classroom._id,
        );
        const relatedProfessor =
          await this.professorService.findByIdAndPopulateUser(
            relatedTeache.professor,
          );

        const allCourses =
          await this.courseService.findAllAcceptedByClassroomId(
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
   * Retorna datos del usuario obtenido a traves del id de la url para ser usados en la pagina "Perfil del usuario"
   */
  @Get('profile/:id')
  @UseGuards(JwtGuard, UserParamIdGuard)
  async getProfileData(@ReqUserParam() user: UserDocument) {
    const nationality = await this.nationalityService.findById(
      user.nationality,
    );

    const professor = await this.professorService.findByUserId(user._id);

    const profileData: IProfileData = {
      fullName: `${user.firstName} ${user.lastName}`,
      nationality: nationality.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      isProfessor: !!professor,
      username: user.username,
    };

    return profileData;
  }

  /**
   * Retorna los permisos del usuario obtenido en el access_token
   */
  @Get('me/permissions')
  @UseGuards(JwtGuard)
  async getPermissions(@ReqUserJwt() user: UserDocument) {
    const permissions: IUserPermissions = {
      canCreateClassrooms: false,
    };

    const professor = await this.professorService.findByUserId(user._id);

    if (professor) {
      permissions.canCreateClassrooms = true;
    }

    return permissions;
  }

  /**
   * Retorna el usuario obtenido a traves del id en la url
   */
  @Get(':id')
  @UseGuards(JwtGuard, UserParamIdGuard)
  async getUser(@ReqUserParam() user: UserDocument) {
    return await this.userService.findById(user._id);
  }

  /**
   * Retorna todos los usuarios registrados
   */
  @Get()
  async getAll() {
    return await this.userService.findAll();
  }
}
