import { Module } from '@nestjs/common';
import { NationalitiesService } from './nationalities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Nacionality, NacionalitySchema } from './schemas/nationality.schema';
import { NationalitiesController } from './nationalities.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nacionality.name, schema: NacionalitySchema },
    ]),
  ],
  providers: [NationalitiesService],
  controllers: [NationalitiesController],
})
export class NationalitiesModule {}
