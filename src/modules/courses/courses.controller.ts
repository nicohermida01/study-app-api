import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dtos/createCourse.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Post('create')
  async createCourse(@Body() dto: CreateCourseDTO) {
    const course = await this.courseService.create(dto);
    return course;
  }

  @Get()
  async getAllCourses() {
    return await this.courseService.findAll();
  }
}
