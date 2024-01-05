import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Classroom, ClassroomSchema } from './schemas/classroom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Classroom.name, schema: ClassroomSchema },
    ]),
  ],
  providers: [ClassroomsService],
})
export class ClassroomsModule {}
