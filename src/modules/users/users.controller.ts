import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { TeachersService } from '../teachers/teachers.service';
import { IUserPermissions } from './interfaces/permissions.interface';
import { NationalitiesService } from '../nationalities/nationalities.service';
import { UserParamIdGuard } from './guards/userParamId.guard';
import { ReqUserParam } from './decorators/req-user-param.decorator';
import { UserDocument } from './schemas/user.schema';
import { IProfileData } from './interfaces/profileData.interface';
import { ReqUserJwt } from '../auth/decorators/req-user-jwt.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private teacherService: TeachersService,
    private nationalityService: NationalitiesService,
  ) {}

  @Get('profile/:id')
  @UseGuards(JwtGuard, UserParamIdGuard) // cambiar el user request key cuando se usan estos dos guards
  async getProfileData(@ReqUserParam() user: UserDocument) {
    const nationality = await this.nationalityService.findById(
      user.nationalityId,
    );

    const relatedTeacher = await this.teacherService.findByUserId(user._id);

    const profileData: IProfileData = {
      fullName: `${user.firstName} ${user.lastName}`,
      nationality: nationality.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      isTeacher: !!relatedTeacher,
      username: user.username,
    };

    return profileData;
  }

  @Get('me/permissions')
  @UseGuards(JwtGuard)
  async getPermissions(@ReqUserJwt() user: UserDocument) {
    const permissions: IUserPermissions = {
      canCreateClassrooms: false,
    };

    const teacher = await this.teacherService.findByUserId(user._id);

    if (teacher) {
      permissions.canCreateClassrooms = true;
    }

    return permissions;
  }

  @Get(':id')
  @UseGuards(JwtGuard, UserParamIdGuard)
  async getUser(@ReqUserParam() user: UserDocument) {
    return await this.userService.findById(user._id);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }
}
