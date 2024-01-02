import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dtos/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayloadAuth } from './interfaces/jwt-auth-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: RegisterAuthDto) {
    const passwordHashed = await bcrypt.hash(dto.password, 10);
    dto.password = passwordHashed;

    const newUser = await this.userService.create(dto);

    return newUser;
  }

  @Post('login')
  async loginUser(@Body() dto: LoginAuthDto) {
    const foundUser = await this.userService.findOne({
      email: dto.email,
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

    return {
      user: foundUser,
      token,
    };
  }
}
