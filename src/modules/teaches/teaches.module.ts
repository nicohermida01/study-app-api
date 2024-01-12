import { Module } from '@nestjs/common';
import { TeachesService } from './teaches.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Teaches, TeachesSchema } from './schemas/teaches.schema';
import { TeachesController } from './teaches.controller';
import { TeachersModule } from '../teachers/teachers.module';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teaches.name, schema: TeachesSchema }]),
    TeachersModule,
    UsersModule,
  ],
  providers: [TeachesService, JwtService],
  exports: [TeachesService],
  controllers: [TeachesController],
})
export class TeachesModule {}
