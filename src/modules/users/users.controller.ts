import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() dto: CreateUserDTO) {
    console.log('creating user ...');
    await this.userService.create(dto);

    console.log('user created! :D');
  }

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }
}
