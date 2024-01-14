import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import { Model, Types } from 'mongoose';
import { CreateTeacherDto } from './dtos/createTeacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
  ) {}

  async findAll(): Promise<TeacherDocument[]> {
    return await this.teacherModel.find().exec();
  }

  async findById(id: Types.ObjectId): Promise<TeacherDocument> {
    return await this.teacherModel.findById(id).exec();
  }

  async findByUserId(userId: Types.ObjectId): Promise<TeacherDocument> {
    return await this.teacherModel.findOne({
      userId: userId.toHexString(),
    });
  }

  async create(
    teacherData: CreateTeacherDto,
    userId: Types.ObjectId,
  ): Promise<TeacherDocument> {
    const teacher: Teacher = {
      ...teacherData,
      userId: userId,
    };

    const createdTeacher = new this.teacherModel(teacher);
    return await createdTeacher.save();
  }
}
