import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './schemas/teacher.schema';
import { Model } from 'mongoose';
import { ITeacher } from './interfaces/teacher.interface';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  async create(teacherData: ITeacher): Promise<ITeacher> {
    const createdTeacher = new this.teacherModel(teacherData);
    return createdTeacher.save();
  }
}
