import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import { Model, Types } from 'mongoose';
import { ITeacher } from './interfaces/teacher.interface';
import { CreateTeacherDto } from './dtos/createTeacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  async findAll(): Promise<ITeacher[]> {
    return this.teacherModel.find().exec();
  }

  async findById(id: Types.ObjectId): Promise<ITeacher> {
    return await this.teacherModel.findById(id).exec();
  }

  async findByUserId(userId: Types.ObjectId): Promise<TeacherDocument> {
    return await this.teacherModel.findOne({
      user: userId,
    });
  }

  async create(
    teacherData: CreateTeacherDto,
    userId: Types.ObjectId,
  ): Promise<ITeacher> {
    const teacher: ITeacher = {
      ...teacherData,
      user: userId,
    };

    const createdTeacher = new this.teacherModel(teacher);
    return createdTeacher.save();
  }
}
