import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teaches } from './schemas/teaches.schema';
import { Model } from 'mongoose';
import { ITeaches } from './interfaces/teaches.interface';

@Injectable()
export class TeachesService {
  constructor(
    @InjectModel(Teaches.name) private teachesModel: Model<Teaches>,
  ) {}

  async create(teachesData: ITeaches): Promise<ITeaches> {
    const createdTeaches = new this.teachesModel(teachesData);
    return createdTeaches.save();
  }
}
