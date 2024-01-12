import { Types } from 'mongoose';

export interface IFriendship {
  userLeft: Types.ObjectId;
  userRight: Types.ObjectId;
}
