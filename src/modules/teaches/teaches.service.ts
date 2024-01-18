import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teaches, TeachesDocument } from './schemas/teaches.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TeachesService {
  constructor(
    @InjectModel(Teaches.name) private teachesModel: Model<TeachesDocument>,
  ) {}

  async findByClassIdAndProfessorId(
    classroomId: Types.ObjectId,
    professorId: Types.ObjectId,
  ): Promise<TeachesDocument> {
    return await this.teachesModel.findOne({
      professorId,
      classroomId,
    });
  }

  async findByClassroomId(id: Types.ObjectId): Promise<TeachesDocument> {
    return await this.teachesModel.findOne({ classroomId: id });
  }

  async findAllByProfessorId(
    professorId: Types.ObjectId,
  ): Promise<TeachesDocument[]> {
    return await this.teachesModel
      .find({ professorId: professorId.toHexString() })
      .exec();
  }

  async create(
    professorId: Types.ObjectId,
    classroomId: Types.ObjectId,
  ): Promise<TeachesDocument> {
    const teaches: Teaches = {
      startDate: new Date(),
      professorId: professorId,
      classroomId: classroomId,
    };

    const createdTeaches = new this.teachesModel(teaches);
    return await createdTeaches.save();
  }
}
