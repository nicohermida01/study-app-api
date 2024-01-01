import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JWT_SECRET_AUTH } from 'src/constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      /* secret: process.env.JWT_SECRET_AUTH, */
      secret: JWT_SECRET_AUTH,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
