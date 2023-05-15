import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/study'),
    UsersModule,
    CoursesModule,
  ], // change into .env
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
