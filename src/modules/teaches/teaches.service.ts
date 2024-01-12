import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teaches } from './schemas/teaches.schema';
import { Model, Types } from 'mongoose';
import { ITeaches } from './interfaces/teaches.interface';

@Injectable()
export class TeachesService {
  constructor(
    @InjectModel(Teaches.name) private teachesModel: Model<Teaches>,
  ) {}

  async findAllByTeacherId(teacherId: Types.ObjectId) {
    return await this.teachesModel.find({ teacher: teacherId }).exec();
  }

  async create(
    teacherId: Types.ObjectId,
    classroomId: Types.ObjectId,
  ): Promise<ITeaches> {
    const teaches: ITeaches = {
      startDate: new Date(),
      teacher: teacherId,
      classroom: classroomId,
    };

    const createdTeaches = new this.teachesModel(teaches);
    return await createdTeaches.save();
  }
}
