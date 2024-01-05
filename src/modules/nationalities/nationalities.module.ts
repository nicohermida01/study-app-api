import { Module } from '@nestjs/common';
import { NationalitiesService } from './nationalities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Nacionality, NacionalitySchema } from './schemas/nationality.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nacionality.name, schema: NacionalitySchema },
    ]),
  ],
  providers: [NationalitiesService],
})
export class NationalitiesModule {}
