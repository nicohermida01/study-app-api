import { Module } from '@nestjs/common';
import { AttendsService } from './attends.service';

@Module({
  providers: [AttendsService]
})
export class AttendsModule {}
