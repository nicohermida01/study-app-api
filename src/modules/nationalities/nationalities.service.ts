import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nacionality } from './schemas/nationality.schema';
import { Model } from 'mongoose';
import { INacionality } from './interfaces/nacionality.interface';
import { ICreateNationalityDto } from './dtos/createNationality.dto';

@Injectable()
export class NationalitiesService {
  constructor(
    @InjectModel(Nacionality.name) private nacionalityModel: Model<Nacionality>,
  ) {}

  async create(data: ICreateNationalityDto): Promise<INacionality> {
    const createdNacionality = new this.nacionalityModel(data);
    return createdNacionality.save();
  }

  async findAll(): Promise<INacionality[]> {
    return this.nacionalityModel.find().exec();
  }
}
