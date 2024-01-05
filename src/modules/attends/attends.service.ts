import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attends } from './schemas/attends.schema';
import { Model } from 'mongoose';
import { IAttends } from './interfaces/attends.interface';

@Injectable()
export class AttendsService {
  constructor(
    @InjectModel(Attends.name) private attendsModel: Model<Attends>,
  ) {}

  async create(data: IAttends): Promise<IAttends> {
    const cratedAttends = new this.attendsModel(data);
    return cratedAttends.save();
  }
}
