import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateTeacherDto } from './dtos/createTeacher.dto';
import { TeachersService } from './teachers.service';
import { UserDocument } from '../users/schemas/user.schema';
import { ReqUserJwt } from '../auth/decorators/req-user-jwt.decorator';

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
    @ReqUserJwt() user: UserDocument,
    @Body() dto: CreateTeacherDto,
  ) {
    return await this.teacherService.create(dto, user._id);
  }
}
