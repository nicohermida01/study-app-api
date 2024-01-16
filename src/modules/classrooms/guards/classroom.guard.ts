import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClassroomsService } from '../classrooms.service';
import { CLASSROOM_REQUEST_KEY } from 'src/constants';
import { plainToClass } from 'class-transformer';
import { MongoIdDto } from 'src/common/dtos/mongoId.dto';
import { strictValidateOrReject } from 'src/modules/users/guards/userParamId.guard';
import { CLASSROOM_NOT_FOUND, INVALID_BODY } from 'src/ssot/errorCodes';

@Injectable()
export class ClassroomGuard implements CanActivate {
  constructor(private classroomService: ClassroomsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const dto = plainToClass(MongoIdDto, request.params);

    try {
      await strictValidateOrReject(dto);
    } catch (error) {
      throw new BadRequestException(error, INVALID_BODY);
    }

    const classroom = await this.classroomService.findById(dto.id);

    if (!classroom) throw new NotFoundException(CLASSROOM_NOT_FOUND);

    request[CLASSROOM_REQUEST_KEY] = classroom;

    return true;
  }
}
