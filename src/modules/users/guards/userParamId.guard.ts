import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { MongoIdDto } from 'src/common/dtos/mongoId.dto';
import { INVALID_BODY, USER_NOT_FOUND } from 'src/ssot/errorCodes';
import { UsersService } from '../users.service';
import { USER_PARAM_REQUEST_KEY } from 'src/constants';

export const strictValidateOrReject = (dto: any) =>
  validateOrReject(dto, {
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  });

@Injectable()
export class UserParamIdGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const dto = plainToClass(MongoIdDto, request.params);

    try {
      await strictValidateOrReject(dto);
    } catch (error) {
      throw new BadRequestException(error, INVALID_BODY);
    }

    const user = await this.userService.findById(dto.id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    request[USER_PARAM_REQUEST_KEY] = user;

    return true;
  }
}
