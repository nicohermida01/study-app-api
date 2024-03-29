import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teaches, TeachesDocument } from './schemas/teaches.schema';
import { Model, Types } from 'mongoose';
import { ITeachesPopulatedClass } from './interface/teachesPopulated.interface';

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
      professor: professorId,
      classroom: classroomId,
    });
  }

  async findByClassroomId(
    classroomId: Types.ObjectId,
  ): Promise<TeachesDocument> {
    return await this.teachesModel.findOne({ classroom: classroomId });
  }

  async findAllByProfessorId(
    professorId: Types.ObjectId,
  ): Promise<TeachesDocument[]> {
    return await this.teachesModel
      .find({ professor: professorId.toHexString() })
      .exec();
  }

  async findAllByProfessorIdAndPopulateClass(
    professorId: Types.ObjectId,
  ): Promise<ITeachesPopulatedClass[]> {
    return (await this.teachesModel
      .find({ professor: professorId })
      .populate({
        path: 'classroom',
        populate: { path: 'subject' },
      })
      .exec()) as any;
  }

  async create(
    professorId: Types.ObjectId,
    classroomId: Types.ObjectId,
  ): Promise<TeachesDocument> {
    const doc: Teaches = {
      startDate: new Date(),
      professor: professorId,
      classroom: classroomId,
    };

    return await this.teachesModel.create(doc);
  }
}
