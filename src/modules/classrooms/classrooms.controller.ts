import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ReqUserAuth } from '../users/decorators/user-auth.decorator';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dtos/createClassroom.dto';
import { Types } from 'mongoose';
import { TeachesService } from '../teaches/teaches.service';
import { TeachersService } from '../teachers/teachers.service';

@Controller('classrooms')
export class ClassroomsController {
  constructor(
    private classroomService: ClassroomsService,
    private teachesService: TeachesService,
    private teacherService: TeachersService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  async createClassroom(
    @ReqUserAuth() userId: Types.ObjectId,
    @Body() dto: CreateClassroomDto,
  ) {
    const relatedTeacher = await this.teacherService.findByUserId(userId); // create a TeacherGuard for this

    if (!relatedTeacher)
      throw new BadRequestException('User must be a teacher');

    const classroom = await this.classroomService.create(dto);

    const teaches = await this.teachesService.create(
      relatedTeacher._id,
      classroom._id,
    );

    return classroom.code;
  }
}
