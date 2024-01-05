import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nacionality } from './schemas/nationality.schema';
import { Model } from 'mongoose';
import { INacionality } from './interfaces/nacionality.interface';

@Injectable()
export class NationalitiesService {
  constructor(
    @InjectModel(Nacionality.name) private nacionalityModel: Model<Nacionality>,
  ) {}

  async create(data: INacionality): Promise<INacionality> {
    const createdNacionality = new this.nacionalityModel(data);
    return createdNacionality.save();
  }
}
