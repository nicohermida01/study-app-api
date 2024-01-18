import { Module } from '@nestjs/common';
import { NationalityController } from './nationality.controller';
import { NationalityService } from './nationality.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Nationality, NationalitySchema } from './schemas/nationality.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nationality.name, schema: NationalitySchema },
    ]),
  ],
  controllers: [NationalityController],
  providers: [NationalityService],
  exports: [NationalityService],
})
export class NationalityModule {}
