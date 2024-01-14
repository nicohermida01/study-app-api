import { Module } from '@nestjs/common';
import { AttendsService } from './attends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Attends, AttendsSchema } from './schemas/attends.schema';
import { AttendsController } from './attends.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attends.name, schema: AttendsSchema }]),
    UsersModule,
  ],
  providers: [AttendsService, JwtService],
  controllers: [AttendsController],
  exports: [AttendsService],
})
export class AttendsModule {}
