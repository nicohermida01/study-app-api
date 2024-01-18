import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Specialization,
  SpecializationDocument,
} from './schemas/specialization.schema';
import { Model } from 'mongoose';

@Injectable()
export class SpecializationService {
  constructor(
    @InjectModel(Specialization.name)
    private specializationModel: Model<SpecializationDocument>,
  ) {}

  async createMany(docs: Specialization[]) {
    return await this.specializationModel.create(docs);
  }
}
