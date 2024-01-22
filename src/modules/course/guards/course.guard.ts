import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CourseService } from '../course.service';
import { plainToClass } from 'class-transformer';
import { MongoIdDto } from 'src/common/dtos/mongoId.dto';
import { strictValidateOrReject } from 'src/modules/user/guards/userParamId.guard';
import { COURSE_NOT_FOUND, INVALID_BODY } from 'src/ssot/errorCodes';
import { COURSE_REQUEST_KEY } from 'src/constants';

@Injectable()
export class CourseGuard implements CanActivate {
  constructor(private courseService: CourseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const dto = plainToClass(MongoIdDto, request.params);

    try {
      await strictValidateOrReject(dto);
    } catch (error) {
      throw new BadRequestException(error, INVALID_BODY);
    }

    const course = await this.courseService.findById(dto.id);

    if (!course) throw new NotFoundException(COURSE_NOT_FOUND);

    request[COURSE_REQUEST_KEY] = course;

    return true;
  }
}
