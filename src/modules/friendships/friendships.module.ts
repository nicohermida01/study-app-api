import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Friendship, FriendshipSchema } from './schemas/friendship.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Friendship.name, schema: FriendshipSchema },
    ]),
  ],
  providers: [FriendshipsService],
})
export class FriendshipsModule {}
