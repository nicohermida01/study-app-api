import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teaches, TeachesDocument } from './schemas/teaches.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TeachesService {
  constructor(
    @InjectModel(Teaches.name) private teachesModel: Model<TeachesDocument>,
  ) {}

  async findByClassroomId(id: Types.ObjectId): Promise<TeachesDocument> {
    return await this.teachesModel.findOne({ classroomId: id });
  }

  async findAllByTeacherId(
    teacherId: Types.ObjectId,
  ): Promise<TeachesDocument[]> {
    return await this.teachesModel
      .find({ teacherId: teacherId.toHexString() })
      .exec();
  }

  async create(
    teacherId: Types.ObjectId,
    classroomId: Types.ObjectId,
  ): Promise<TeachesDocument> {
    const teaches: Teaches = {
      startDate: new Date(),
      teacherId: teacherId,
      classroomId: classroomId,
    };

    const createdTeaches = new this.teachesModel(teaches);
    return await createdTeaches.save();
  }
}
