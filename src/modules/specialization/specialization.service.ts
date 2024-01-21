import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Specialization,
  SpecializationDocument,
} from './schemas/specialization.schema';
import { Model, Types } from 'mongoose';
import { ISpecializationPopulated } from './interfaces/specializationPopulated.interface';

@Injectable()
export class SpecializationService {
  constructor(
    @InjectModel(Specialization.name)
    private specializationModel: Model<SpecializationDocument>,
  ) {}

  async findAllByProfessorIdAndPopulateSubject(
    professorId: Types.ObjectId,
  ): Promise<ISpecializationPopulated[]> {
    return this.specializationModel
      .find({ professor: professorId })
      .populate('subject')
      .exec() as any;
  }

  async createMany(docs: Specialization[]) {
    return await this.specializationModel.create(docs);
  }
}
