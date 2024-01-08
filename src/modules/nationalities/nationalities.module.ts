import { Module } from '@nestjs/common';
import { NationalitiesService } from './nationalities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Nationality, NationalitySchema } from './schemas/nationality.schema';
import { NationalitiesController } from './nationalities.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nationality.name, schema: NationalitySchema },
    ]),
  ],
  providers: [NationalitiesService],
  controllers: [NationalitiesController],
})
export class NationalitiesModule {}
