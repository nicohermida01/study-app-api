import { Module } from '@nestjs/common';
import { TeachesService } from './teaches.service';

@Module({
  providers: [TeachesService]
})
export class TeachesModule {}
