import { Types } from 'mongoose';

export interface ITeaches {
  startDate: Date;
  endDate?: Date;
  teacher: Types.ObjectId;
  classroom: Types.ObjectId;
}
