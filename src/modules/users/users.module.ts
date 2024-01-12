import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TeachersModule,
  ],
  providers: [UsersService, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
