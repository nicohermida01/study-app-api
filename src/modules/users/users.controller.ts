import { Body, Controller, Get, Post, Param, Patch, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { EditUserDTO } from './dtos/editUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDTO) {
    const user = await this.userService.create(dto);
    return user;
  }

  @Get('/:id')
  async getUserById(@Param('id') id:string) {
    return await this.userService.findOneById(id);
  }

  @Patch('/:id')
  async findByIdAndUpdate(@Param('id') id:string, @Body() dto: EditUserDTO) {
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
