import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attends, AttendsDocument } from './schemas/attends.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AttendsService {
  constructor(
    @InjectModel(Attends.name) private attendsModel: Model<AttendsDocument>,
  ) {}

  async create(data: any): Promise<AttendsDocument> {
    const cratedAttends = new this.attendsModel(data);
    return await cratedAttends.save();
  }

  async findAllAttendsByUserId(
    userId: Types.ObjectId,
  ): Promise<AttendsDocument[]> {
    return await this.attendsModel
      .find({
        userId: userId.toHexString(),
      })
      .exec();
  }
}
