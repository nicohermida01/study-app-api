import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReqUserAuth } from './decorators/user-auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async authenticateUser(@ReqUserAuth() userId) {
    const user = await this.userService.findOneById(userId);

    return user;
  }

  @Get('nationality')
  @UseGuards(JwtAuthGuard)
  async getNationality(@ReqUserAuth() userId) {
    const userPopulated = await this.userService.findOneByIdPopulated(userId);

    return userPopulated.nationality.name;
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }

  /* @Patch('/:id')
  async findByIdAndUpdate(@Param('id') id: string, @Body() dto: EditUserDTO) {
    return await this.userService.findByIdAndUpdate(id, dto);
  } */

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  /* @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.findByIdAndDelete(id);
  } */
}
