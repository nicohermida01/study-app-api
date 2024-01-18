import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TeachesModule } from './modules/teaches/teaches.module';
import { UserModule } from './modules/user/user.module';
import { NationalityModule } from './modules/nationality/nationality.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { SpecializationModule } from './modules/specialization/specialization.module';
import { SubjectModule } from './modules/subject/subject.module';
import { ClassroomModule } from './modules/classroom/classroom.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/study', {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-unique-validator'), {
          message: '{PATH} already taken',
        });
        return connection;
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
    TeachesModule,
    UserModule,
    NationalityModule,
    ProfessorModule,
    SpecializationModule,
    SubjectModule,
    ClassroomModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
