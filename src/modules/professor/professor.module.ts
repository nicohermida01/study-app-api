import { Module, forwardRef } from '@nestjs/common';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Professor, ProfessorSchema } from './schemas/professor.schema';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { SpecializationModule } from '../specialization/specialization.module';
import { TeachesModule } from '../teaches/teaches.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professor.name, schema: ProfessorSchema },
    ]),
    forwardRef(() => UserModule),
    SpecializationModule,
    TeachesModule,
    CourseModule,
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService, JwtService],
  exports: [ProfessorService],
})
export class ProfessorModule {}
