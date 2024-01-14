import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friendship, FriendshipDocument } from './schemas/friendship.schema';
import { Model } from 'mongoose';

@Injectable()
export class FriendshipsService {
  constructor(
    @InjectModel(Friendship.name)
    private friendshipModel: Model<FriendshipDocument>,
  ) {}

  async create(data: any): Promise<FriendshipDocument> {
    const createdFriendship = new this.friendshipModel(data);
    return await createdFriendship.save();
  }
}
