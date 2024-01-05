import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';

@Module({
  providers: [FriendshipsService]
})
export class FriendshipsModule {}
