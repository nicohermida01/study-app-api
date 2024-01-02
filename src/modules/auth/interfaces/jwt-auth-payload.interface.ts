import { Types } from 'mongoose';

export interface IJwtPayloadAuth {
  name: string;
  userId: Types.ObjectId;
}
