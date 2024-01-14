import { Types } from 'mongoose';

export interface IJwtPayload {
  sub: string;
  username: string;
}
