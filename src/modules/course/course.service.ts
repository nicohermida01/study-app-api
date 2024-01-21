import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { ICoursePopulateClass } from './interfaces/coursePopulated.interface';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async findAllPendingForClassroom(
    classroomId: Types.ObjectId,
  ): Promise<CourseDocument[]> {
    const filter: FilterQuery<CourseDocument> = {
      classroom: classroomId,
      status: 'Pending',
    };

    return await this.courseModel.find(filter).exec();
  }

  async findAllByClassroomId(
    classroomId: Types.ObjectId,
  ): Promise<CourseDocument[]> {
    return await this.courseModel
      .find({ classroom: classroomId.toHexString() })
      .exec();
  }

  async findByClassAndUserId(
    classroomId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<CourseDocument> {
    return await this.courseModel.findOne({
      user: userId,
      classroom: classroomId,
    });
  }

  async findAllByUserId(userId: Types.ObjectId): Promise<CourseDocument[]> {
    return await this.courseModel
      .find({
        user: userId.toHexString(),
      })
      .exec();
  }

  async findAllByUserIdAndPopulateClass(
    userId: Types.ObjectId,
  ): Promise<ICoursePopulateClass[]> {
    return (await this.courseModel
      .find({
        user: userId.toHexString(),
      })
      .populate({
        path: 'classroom',
        populate: { path: 'subject' },
      })
      .exec()) as any;
  }

  async createOne(
    userId: Types.ObjectId,
    classroomId: Types.ObjectId,
  ): Promise<CourseDocument> {
    const doc: Course = {
      status: 'Pending',
      user: userId,
      classroom: classroomId,
    };

    return await this.courseModel.create(doc);
  }
}
