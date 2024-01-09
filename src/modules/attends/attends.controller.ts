import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserParamIdGuard } from '../users/guards/userParamId.guard';
import { User, UserDocument } from '../users/schemas/user.schema';
import { ReqUserParam } from '../users/decorators/req-user-param.decorator';
import { AttendsService } from './attends.service';

@Controller('attends')
export class AttendsController {
  constructor(private attendsService: AttendsService) {}

  @Get('user/:id')
  @UseGuards(JwtGuard, UserParamIdGuard)
  async getAllAttendsForUser(@ReqUserParam() user: UserDocument) {
    return await this.attendsService.findAllAttendsByUserId(user._id);
  }
}
