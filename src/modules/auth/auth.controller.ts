import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dtos/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayloadAuth } from './interfaces/jwt-auth-payload.interface';
import { Response } from 'express';
import { CookieService } from '../cookie/cookie.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private cookieService: CookieService,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: RegisterAuthDto) {
    const passwordHashed = await bcrypt.hash(dto.password, 10);
    dto.password = passwordHashed;

    const newUser = await this.userService.create(dto);

    return newUser;
  }

  @Post('login')
  async loginUser(@Body() dto: LoginAuthDto, @Res() res: Response) {
    const foundUser = await this.userService.findOne({
      username: dto.username,
    });

    const passwordCorrect =
      foundUser === null
        ? false
        : await bcrypt.compare(dto.password, foundUser.password);

    if (!(foundUser && passwordCorrect)) {
      throw new UnauthorizedException('invalid username or password');
    }

    const payload: IJwtPayloadAuth = {
      name: `${foundUser.firstName} ${foundUser.lastName}`,
      userId: foundUser._id,
    };

    const token = this.jwtService.sign(payload);

    this.cookieService.setAccessToken(token, res);

    res.json('Logged Succesfully'); // change into message response const
  }

  @Get('logout')
  async logoutUser(@Res() res: Response) {
    this.cookieService.removeAccessToken(res);

    res.json('Logout successfully'); // change into message response const
  }
}
