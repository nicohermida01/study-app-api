import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CookieModule } from './modules/cookie/cookie.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/study', {
      // change into .env
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-unique-validator'), {
          message: '{PATH} already taken',
        });
        return connection;
      },
    }),
    UsersModule,
    CoursesModule,
    ConfigModule.forRoot(),
    AuthModule,
    CookieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
