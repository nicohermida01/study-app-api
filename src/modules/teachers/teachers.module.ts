import { Module, forwardRef } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { TeachersController } from './teachers.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    forwardRef(() => UsersModule),
  ],
  providers: [TeachersService, JwtService],
  exports: [TeachersService],
  controllers: [TeachersController],
})
export class TeachersModule {}
