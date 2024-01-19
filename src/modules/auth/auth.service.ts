import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { UserDocument } from '../user/schemas/user.schema';
import { INVALID_CREDENTIALS } from 'src/ssot/errorCodes';
import { IJwtPayload } from './interfaces/jwt-auth-payload.interface';
import { ACCESS_TOKEN_EXPIRE_TIME } from './constants';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    const backendTokens = await this.generateTokens(user);

    return {
      user,
      backendTokens: backendTokens,
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByUsername(dto.username);

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(dto.password, user.password);

    if (!(user && passwordCorrect))
      throw new UnauthorizedException(INVALID_CREDENTIALS);

    return user;
  }

  async refreshToken(user: UserDocument) {
    return await this.generateTokens(user);
  }

  private async generateTokens(user: UserDocument) {
    const payload: IJwtPayload = {
      username: user.username,
      sub: user._id.toHexString(),
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      /* expiresIn: '1m', // for testing */
      /* expiresIn: '20s', // for testing */
      secret: process.env.JWT_SECRET_KEY,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
    });

    const expires_at = new Date().setTime(
      new Date().getTime() + ACCESS_TOKEN_EXPIRE_TIME,
    );

    return {
      access_token,
      refresh_token,
      expires_at,
    };
  }

  async authenticateUser(id: Types.ObjectId) {
    return await this.userService.findById(id);
  }
}
