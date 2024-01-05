import { Module } from '@nestjs/common';
import { AttendsService } from './attends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Attends, AttendsSchema } from './schemas/attends.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attends.name, schema: AttendsSchema }]),
  ],
  providers: [AttendsService],
})
export class AttendsModule {}
