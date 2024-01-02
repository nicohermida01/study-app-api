import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET_AUTH } from 'src/constants';
import { IJwtPayloadAuth } from './interfaces/jwt-auth-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_AUTH,
    });
  }

  async validate(payload: IJwtPayloadAuth): Promise<IJwtPayloadAuth> {
    return { userId: payload.userId, name: payload.name };
  }
}
