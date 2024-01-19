import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Classroom, ClassroomDocument } from './schemas/classroom.schema';
import { FilterQuery, Model, QueryOptions, Types } from 'mongoose';
import { CreateClassroomDto } from './dtos/createClassroom.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: Model<ClassroomDocument>,
  ) {}

  async findById(classroomId: Types.ObjectId): Promise<ClassroomDocument> {
    return await this.classroomModel.findById(classroomId);
  }

  async findByClassroomCode(classroomCode: string): Promise<ClassroomDocument> {
    return this.classroomModel.findOne({ code: classroomCode });
  }

  async getAllByFilter(
    filter: FilterQuery<ClassroomDocument>,
    options: QueryOptions<ClassroomDocument> = {},
  ): Promise<ClassroomDocument[]> {
    return await this.classroomModel.find(filter, {}, options).exec();
  }

  async create(dto: CreateClassroomDto): Promise<ClassroomDocument> {
    const doc: Classroom = {
      ...dto,
      code: uuidv4(),
    };

    return await this.classroomModel.create(doc);
  }
}
