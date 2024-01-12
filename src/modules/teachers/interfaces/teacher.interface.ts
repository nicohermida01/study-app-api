import { Types } from 'mongoose';
import { IUser } from 'src/modules/users/interfaces/user.interface';

export interface ITeacher {
  area: string;
  education: string;
  user: Types.ObjectId;
}
