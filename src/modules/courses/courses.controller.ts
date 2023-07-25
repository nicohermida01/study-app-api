import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dtos/createCourse.dto';
import { EditCourseDTO } from './dtos/editCourse.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Post('create')
  async createCourse(@Body() dto: CreateCourseDTO) {
    const course = await this.courseService.create(dto);
    return course;
  }

  @Get('/:id')
  async getCourseById(@Param('id') id: string) {
    const course = await this.courseService.getCourseById(id);
    return course;
  }

  @Get()
  async getAllCourses() {
    return await this.courseService.findAll();
  }

  @Patch('/:id')
  async updateCourseById(@Param('id') id: string, @Body() dto: EditCourseDTO) {
    return await this.courseService.findByIdAndUpdate(id, dto);
  }

  @Delete('/:id')
  async deleteCourse(@Param('id') id: string) {
    return await this.courseService.findByIdAndDelete(id);
  }
}
