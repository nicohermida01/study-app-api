import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { INVALID_LOGIN_ERROR_MESSAGE } from 'src/ssot/errorMessages';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_EXPIRE_TIME } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const newUser = await this.userService.create(dto);
    return newUser;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    const payload = {
      username: user.username,
      userId: user._id,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
    });

    const expiresIn = new Date().setTime(
      new Date().getTime() + ACCESS_TOKEN_EXPIRE_TIME,
    );

    return {
      user,
      backendTokens: {
        accessToken,
        refreshToken,
        expiresIn,
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByUsername(dto.username);

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(dto.password, user.password);

    if (!(user && passwordCorrect))
      throw new UnauthorizedException(INVALID_LOGIN_ERROR_MESSAGE);

    return user;
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      userId: user._id,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
    });

    const expiresIn = new Date().setTime(
      new Date().getTime() + ACCESS_TOKEN_EXPIRE_TIME,
    );

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  async authenticateUser(id: string) {
    return this.userService.findById(id);
  }
}