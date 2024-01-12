import { Types } from 'mongoose';

export interface IAttends {
  entryDate: Date;
  exitDate?: Date;
  user: Types.ObjectId;
  classroom: Types.ObjectId;
}
