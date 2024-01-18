import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Specialization,
  SpecializationSchema,
} from './schemas/specialization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Specialization.name, schema: SpecializationSchema },
    ]),
  ],
  providers: [SpecializationService],
  exports: [SpecializationService],
})
export class SpecializationModule {}
