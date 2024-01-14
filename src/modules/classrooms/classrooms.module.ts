import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Classroom, ClassroomSchema } from './schemas/classroom.schema';
import { ClassroomsController } from './classrooms.controller';
import { JwtService } from '@nestjs/jwt';
import { TeachesModule } from '../teaches/teaches.module';
import { TeachersModule } from '../teachers/teachers.module';
import { AttendsModule } from '../attends/attends.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Classroom.name, schema: ClassroomSchema },
    ]),
    TeachesModule,
    TeachersModule,
    AttendsModule,
    UsersModule,
  ],
  providers: [ClassroomsService, JwtService],
  controllers: [ClassroomsController],
})
export class ClassroomsModule {}
