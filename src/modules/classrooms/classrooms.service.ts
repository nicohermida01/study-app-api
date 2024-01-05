import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Classroom } from './schemas/classroom.schema';
import { Model } from 'mongoose';
import { IClassroom } from './interfaces/classroom.interface';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel(Classroom.name) private classroomModel: Model<Classroom>,
  ) {}

  async create(data: IClassroom): Promise<IClassroom> {
    const createdClassroom = new this.classroomModel(data);
    return createdClassroom.save();
  }
}
