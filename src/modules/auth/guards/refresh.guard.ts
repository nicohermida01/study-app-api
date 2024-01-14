import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';
import {
  REFRESH_TOKEN_HAS_EXPIRED,
  REFRESH_TOKEN_MISSING,
  USER_NOT_FOUND,
} from 'src/ssot/errorCodes';
import { IJwtPayload } from '../interfaces/jwt-auth-payload.interface';
import { USER_JWT_REQUEST_KEY } from 'src/constants';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException(REFRESH_TOKEN_MISSING);

    try {
      const payload: IJwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      });

      const relatedUser = await this.userService.findById(payload.sub);

      if (!relatedUser) throw new BadRequestException(USER_NOT_FOUND);

      request[USER_JWT_REQUEST_KEY] = relatedUser;
    } catch (error) {
      throw new UnauthorizedException(REFRESH_TOKEN_HAS_EXPIRED);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? [];

    return type === 'Refresh' ? token : undefined;
  }
}
