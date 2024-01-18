import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async findByClassroomId(id: Types.ObjectId): Promise<CourseDocument[]> {
    return await this.courseModel.find({ classroomId: id }).exec();
  }

  async findByClassAndUserId(
    classroomId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<CourseDocument> {
    return await this.courseModel.findOne({
      userId,
      classroomId,
    });
  }

  async findAllByUserId(userId: Types.ObjectId): Promise<CourseDocument[]> {
    return await this.courseModel
      .find({
        userId: userId.toHexString(),
      })
      .exec();
  }
}
