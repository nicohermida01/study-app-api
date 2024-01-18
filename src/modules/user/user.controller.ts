import { Controller, Get, UseGuards } from '@nestjs/common';
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
   * Retorna todas las classrooms asociadas con el usuario en el access_token
   */
  @Get('classrooms')
  @UseGuards(JwtGuard)
  async getClassrooms(@ReqUserJwt() user: UserDocument) {
    let coursesClass = [];
    let teachesClass = [];

    const courses = await this.courseService.findAllByUserId(user._id);
    if (courses)
      coursesClass = await this.classroomService.getAllByFilter({
        id: { $in: courses.map((item) => item.classroomId) },
      });

    const professor = await this.professorService.findByUserId(user._id);
    if (professor) {
      const teaches = await this.teachesService.findAllByProfessorId(
        professor._id,
      );

      if (teaches)
        teachesClass = await this.classroomService.getAllByFilter({
          id: { $in: teaches.map((item) => item.classroomId) },
        });
    }

    return {
      coursesClass,
      teachesClass,
    };
  }

  /**
   * Retorna datos del usuario obtenido a traves del id de la url para ser usados en la pagina "Perfil del usuario"
   */
  @Get('profile/:id')
  @UseGuards(JwtGuard, UserParamIdGuard)
  async getProfileData(@ReqUserParam() user: UserDocument) {
    const nationality = await this.nationalityService.findById(
      user.nationalityId,
    );

    const professor = await this.professorService.findByUserId(user._id);

    const profileData: IProfileData = {
      fullName: `${user.firstName} ${user.lastName}`,
      nationality: nationality.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      isTeacher: !!professor,
      username: user.username,
    };

    return profileData;
  }

  /**
   * Retorna los permisos del usuario obtenido en el access_token
   */
  @Get('permissions')
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
