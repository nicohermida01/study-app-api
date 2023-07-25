import { IEditCourseDTO } from './dtos/editCourse.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';
import { ICreateCourseDTO } from './dtos/createCourse.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourse: ICreateCourseDTO): Promise<Course> {
    const createdCourse = new this.courseModel(createCourse);
    return createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async getCourseById(id: string) {
    try {
      const course = await this.courseModel.findById(id).exec();
      return course
    } catch (error) {
      console.log(error)
    }
  }

  async findByIdAndUpdate(id: string, values: IEditCourseDTO): Promise<Course> {
    try {
      const course = await this.courseModel.findByIdAndUpdate(id, values, {new:true});
      console.log(course, 'ACTUALIZADO');
      return course;
    } catch (error) {
      console.log(error)
    }
  }

  async findByIdAndDelete(id: string) {
    return await this.courseModel.findByIdAndDelete(id)
  }
}