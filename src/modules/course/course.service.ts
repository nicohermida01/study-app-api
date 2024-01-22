import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import {
  ICoursePopulateClass,
  ICoursePopulateUser,
} from './interfaces/coursePopulated.interface';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async accept(courseId: Types.ObjectId): Promise<CourseDocument> {
    const update: UpdateQuery<CourseDocument> = {
      status: 'Accepted',
      entryDate: new Date(),
    };

    return await this.courseModel.findByIdAndUpdate(courseId, update).exec();
  }

  async reject(courseId: Types.ObjectId) {
    const update: UpdateQuery<CourseDocument> = {
      status: 'Rejected',
      rejectedDate: new Date(),
    };

    return await this.courseModel.findByIdAndUpdate(courseId, update).exec();
  }

  async findById(courseId: Types.ObjectId): Promise<CourseDocument> {
    return await this.courseModel.findById(courseId);
  }

  async findAllPendingForClassroom(
    classroomId: Types.ObjectId,
  ): Promise<ICoursePopulateUser[]> {
    const filter: FilterQuery<CourseDocument> = {
      classroom: classroomId,
      status: 'Pending',
    };

    return (await this.courseModel.find(filter).populate('user').exec()) as any;
  }

  async findAllAcceptedByClassroomId(
    classroomId: Types.ObjectId,
  ): Promise<CourseDocument[]> {
    return await this.courseModel
      .find({ classroom: classroomId.toHexString(), status: 'Accepted' })
      .exec();
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
