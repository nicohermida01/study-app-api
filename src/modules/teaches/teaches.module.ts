import { Module } from '@nestjs/common';
import { TeachesService } from './teaches.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Teaches, TeachesSchema } from './schemas/teaches.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teaches.name, schema: TeachesSchema }]),
  ],
  providers: [TeachesService],
  exports: [TeachesService],
})
export class TeachesModule {}
