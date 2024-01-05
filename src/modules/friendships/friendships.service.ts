import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friendship } from './schemas/friendship.schema';
import { Model } from 'mongoose';
import { IFriendship } from './interfaces/friendship.interface';

@Injectable()
export class FriendshipsService {
  constructor(
    @InjectModel(Friendship.name) private friendshipModel: Model<Friendship>,
  ) {}

  async create(data: IFriendship): Promise<IFriendship> {
    const createdFriendship = new this.friendshipModel(data);
    return createdFriendship.save();
  }
}
