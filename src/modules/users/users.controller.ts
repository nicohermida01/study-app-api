import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDTO) {
    const user = await this.userService.create(dto);
    return user;
  }

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }
}
