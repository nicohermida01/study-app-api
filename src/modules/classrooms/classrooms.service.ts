import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Classroom, ClassroomDocument } from './schemas/classroom.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateClassroomDto } from './dtos/createClassroom.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: Model<ClassroomDocument>,
  ) {}

  async getAllByFilter(
    filter: FilterQuery<ClassroomDocument>,
  ): Promise<ClassroomDocument[]> {
    return await this.classroomModel.find(filter).exec();
  }

  async create(data: CreateClassroomDto): Promise<ClassroomDocument> {
    const classroom: Classroom = {
      ...data,
      code: uuidv4(),
    };

    const createdClassroom = new this.classroomModel(classroom);
    return await createdClassroom.save();
  }
}
