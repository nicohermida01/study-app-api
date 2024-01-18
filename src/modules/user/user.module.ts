import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { NationalityModule } from '../nationality/nationality.module';
import { CourseModule } from '../course/course.module';
import { ClassroomModule } from '../classroom/classroom.module';
import { ProfessorModule } from '../professor/professor.module';
import { TeachesModule } from '../teaches/teaches.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NationalityModule,
    CourseModule,
    ClassroomModule,
    ProfessorModule,
    TeachesModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService],
})
export class UserModule {}
