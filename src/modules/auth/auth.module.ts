import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JWT_SECRET } from 'src/constants';
import { JwtStrategy } from './jwt.strategy';
import { CookieService } from '../cookie/cookie.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      /* secret: process.env.JWT_SECRET_AUTH, */
      secret: JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, CookieService],
})
export class AuthModule {}
