import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ReqUserAuth } from './decorators/user-auth.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Types } from 'mongoose';
import { TeachersService } from '../teachers/teachers.service';
import { IUserPermissions } from './interfaces/permissions.interface';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private teacherService: TeachersService,
  ) {}

  @Get('me/permissions')
  @UseGuards(JwtGuard)
  async getPermissions(@ReqUserAuth() userId: Types.ObjectId) {
    const permissions: IUserPermissions = {
      canCreateClassrooms: false,
    };

    const teacher = await this.teacherService.findByUserId(userId);

    if (teacher) {
      permissions.canCreateClassrooms = true;
    }

    return permissions;
  }

  @Get('nationality')
  @UseGuards(JwtGuard)
  async getNationality(@ReqUserAuth() userId: Types.ObjectId) {
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
