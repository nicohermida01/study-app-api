import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ReqUserAuth } from './decorators/user-auth.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('nationality')
  @UseGuards(JwtGuard)
  async getNationality(@ReqUserAuth() userId) {
    const userPopulated = await this.userService.findOneByIdPopulated(userId);

    return userPopulated.nationality.name;
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getUser(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }
}
