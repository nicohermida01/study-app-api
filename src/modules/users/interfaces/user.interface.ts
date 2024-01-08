import { Types } from 'mongoose';
import { INationality } from 'src/modules/nationalities/interfaces/nationality.interface';

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  _id: Types.ObjectId;
}

export interface IUserPopulated extends IUser {
  nationality: INationality;
}
