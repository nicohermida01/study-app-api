import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Classroom, ClassroomDocument } from './schemas/classroom.schema';
import { Model } from 'mongoose';
import { IClassroom } from './interfaces/classroom.interface';
import { CreateClassroomDto } from './dtos/createClassroom.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel(Classroom.name) private classroomModel: Model<Classroom>,
  ) {}

  async create(data: CreateClassroomDto): Promise<ClassroomDocument> {
    const classroom: IClassroom = {
      ...data,
      code: uuidv4(),
    };

    const createdClassroom = new this.classroomModel(classroom);
    return await createdClassroom.save();
  }
}
