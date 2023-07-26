import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { EditUserDTO } from './dtos/editUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dtos/loginUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/login')
  async loginUser(@Body() dto: LoginUserDTO) {
    const user = await this.userService.findOne({
      username: dto.username,
    });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(dto.password, user.password);

    if (!(user && passwordCorrect)) {
      throw new UnauthorizedException('invalid username or password');
    }

    // armar y retornar el jwt

    return {
      id: user._id,
      username: user.username,
    };
  }

  @Post('/create')
  async createUser(@Body() dto: CreateUserDTO) {
    const passwordHashed = await bcrypt.hash(dto.password, 10);
    dto.password = passwordHashed;
    const user = await this.userService.create(dto);
    return user;
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }

  @Patch('/:id')
  async findByIdAndUpdate(@Param('id') id: string, @Body() dto: EditUserDTO) {
    return await this.userService.findByIdAndUpdate(id, dto);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.findByIdAndDelete(id);
  }
}
