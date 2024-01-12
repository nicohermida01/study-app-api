import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ReqUserAuth } from '../users/decorators/user-auth.decorator';
import { Types } from 'mongoose';
import { CreateTeacherDto } from './dtos/createTeacher.dto';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private teacherService: TeachersService) {}

  @Get()
  async getAllTeachers() {
    return await this.teacherService.findAll();
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(
    @ReqUserAuth() userId: Types.ObjectId,
    @Body() dto: CreateTeacherDto,
  ) {
    return await this.teacherService.create(dto, userId);
  }
}
