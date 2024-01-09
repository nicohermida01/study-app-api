import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { USER_REGISTER_SUCCESSFULLY_MESSAGE } from 'src/ssot/successMessages';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { JwtGuard } from './guards/jwt.guard';
import { ReqUserAuth } from '../users/decorators/user-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return {
      message: USER_REGISTER_SUCCESSFULLY_MESSAGE,
      user: newUser,
    };
  }

  @Post('login')
  async loginUser(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('refresh')
  @UseGuards(RefreshJwtGuard)
  async refreshToken(@Req() req) {
    return await this.authService.refreshToken(req.user);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async authenticateUser(@ReqUserAuth() userId) {
    return await this.authService.authenticateUser(userId);
  }
}
