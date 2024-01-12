import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { TeachesService } from './teaches.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserParamIdGuard } from '../users/guards/userParamId.guard';
import { ReqUserParam } from '../users/decorators/req-user-param.decorator';
import { UserDocument } from '../users/schemas/user.schema';
import { TeachersService } from '../teachers/teachers.service';

@Controller('teaches')
export class TeachesController {
  constructor(
    private teachesService: TeachesService,
    private teacherService: TeachersService,
  ) {}

  @Get('user/:id')
  @UseGuards(JwtGuard, UserParamIdGuard)
  async getAllTeachesForUser(@ReqUserParam() user: UserDocument) {
    const relatedTeacher = await this.teacherService.findByUserId(user._id);

    if (!relatedTeacher)
      throw new BadRequestException('The user must be a teacher');

    return await this.teachesService.findAllByTeacherId(relatedTeacher._id);
  }
}
