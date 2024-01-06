import { Types } from 'mongoose';
import { INacionality } from 'src/modules/nationalities/interfaces/nacionality.interface';

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  _id: Types.ObjectId;
}

export interface IUserPopulated extends IUser {
  nationality: INacionality;
}
