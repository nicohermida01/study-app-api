import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { NationalitiesModule } from './modules/nationalities/nationalities.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { ClassroomsModule } from './modules/classrooms/classrooms.module';
import { AttendsModule } from './modules/attends/attends.module';
import { TeachesModule } from './modules/teaches/teaches.module';
import { FriendshipsModule } from './modules/friendships/friendships.module';

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
    UsersModule,
    ConfigModule.forRoot(),
    AuthModule,
    NationalitiesModule,
    TeachersModule,
    ClassroomsModule,
    AttendsModule,
    TeachesModule,
    FriendshipsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
