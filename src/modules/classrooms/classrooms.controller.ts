import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dtos/createClassroom.dto';
import { TeachesService } from '../teaches/teaches.service';
import { TeachersService } from '../teachers/teachers.service';
import { AttendsService } from '../attends/attends.service';
import { UserParamIdGuard } from '../users/guards/userParamId.guard';
import { ReqUserParam } from '../users/decorators/req-user-param.decorator';
import { UserDocument } from '../users/schemas/user.schema';
import { TeachesDocument } from '../teaches/schemas/teaches.schema';
import { TeacherGuard } from '../teachers/guards/teacher.guard';
import { TeacherDocument } from '../teachers/schemas/teacher.schema';
import { ReqTeacher } from '../teachers/decorators/req-teacher.decorator';
import { UsersService } from '../users/users.service';
import { ClassroomDocument } from './schemas/classroom.schema';
import { ClassroomGuard } from './guards/classroom.guard';
import { ReqClassroom } from './decorators/req-classroom.decorator';
import { ReqUserJwt } from '../auth/decorators/req-user-jwt.decorator';
import { USER_NOT_IN_CLASSROOM } from 'src/ssot/errorCodes';

@Controller('classrooms')
export class ClassroomsController {
  constructor(
    private classroomService: ClassroomsService,
    private teachesService: TeachesService,
    private teacherService: TeachersService,
    private attendsService: AttendsService,
    private userService: UsersService,
  ) {}

  @Get('auth/:id')
  @UseGuards(JwtGuard, ClassroomGuard)
  async verifyUserInClass(
    @ReqClassroom() classroom: ClassroomDocument,
    @ReqUserJwt() user: UserDocument,
  ) {
    let isInClass = false;

    const teacher = await this.teacherService.findByUserId(user._id);

    if (teacher) {
      const teaches = await this.teachesService.findByClassAndTeacherId(
        classroom._id,
        teacher._id,
      );

      if (teaches) isInClass = true;
    }

    const attends = await this.attendsService.findByClassAndUserId(
      classroom._id,
      user._id,
    );

    if (attends) isInClass = true;

    if (!isInClass) throw new UnauthorizedException(USER_NOT_IN_CLASSROOM);

    return classroom;
  }

  @Get('user/:id')
  @UseGuards(JwtGuard, UserParamIdGuard)
  async getAllForRelatedUser(@ReqUserParam() user: UserDocument) {
    const classroomsIds = [];

    const attends = await this.attendsService.findAllAttendsByUserId(user._id);
    if (attends.length > 0) {
      attends.forEach((item) => {
        classroomsIds.push(item.classroomId);
      });
    }

    const relatedTeacher = await this.teacherService.findByUserId(user._id);
    let teaches: TeachesDocument[] = [];

    if (relatedTeacher) {
      teaches = await this.teachesService.findAllByTeacherId(
        relatedTeacher._id,
      );

      if (teaches.length > 0) {
        teaches.forEach((item) => {
          classroomsIds.push(item.classroomId);
        });
      }
    }

    const classrooms = await this.classroomService.getAllByFilter(
      {
        _id: {
          $in: classroomsIds,
        },
      },
      {
        sort: {
          createdAt: -1,
        },
      },
    );

    const classroomsExtend = await Promise.all(
      classrooms.map(async (item) => {
        const classroomTeaches = await this.teachesService.findByClassroomId(
          item._id,
        );
        const teacher = await this.teacherService.findById(
          classroomTeaches.teacherId,
        );
        const user = await this.userService.findById(teacher.userId);

        const allAttends = await this.attendsService.findByClassroomId(
          item._id,
        );

        return {
          name: item.name,
          description: item.description,
          area: teacher.area,
          teacher: `${user.lastName} ${user.firstName}`,
          membersCount: allAttends.length,
          id: item._id,
        };
      }),
    );

    return classroomsExtend;
  }

  @Post()
  @UseGuards(JwtGuard, TeacherGuard)
  async createClassroom(
    @ReqTeacher() teacher: TeacherDocument,
    @Body() dto: CreateClassroomDto,
  ) {
    const classroom = await this.classroomService.create(dto);

    await this.teachesService.create(teacher._id, classroom._id);

    // make a mongoose wrapper for validate all queries are done

    return classroom.code;
  }
}
