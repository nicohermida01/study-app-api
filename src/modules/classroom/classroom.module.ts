import { Module, forwardRef } from '@nestjs/common';
import { ClassroomController } from './classroom.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Classroom, ClassroomSchema } from './schemas/classroom.schema';
import { ClassroomService } from './classroom.service';
import { TeachesModule } from '../teaches/teaches.module';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Classroom.name, schema: ClassroomSchema },
    ]),
    TeachesModule,
    forwardRef(() => UserModule),
    ProfessorModule,
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService, JwtService],
  exports: [ClassroomService],
})
export class ClassroomModule {}
