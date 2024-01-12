import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Classroom, ClassroomSchema } from './schemas/classroom.schema';
import { ClassroomsController } from './classrooms.controller';
import { JwtService } from '@nestjs/jwt';
import { TeachesModule } from '../teaches/teaches.module';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Classroom.name, schema: ClassroomSchema },
    ]),
    TeachesModule,
    TeachersModule,
  ],
  providers: [ClassroomsService, JwtService],
  controllers: [ClassroomsController],
})
export class ClassroomsModule {}
