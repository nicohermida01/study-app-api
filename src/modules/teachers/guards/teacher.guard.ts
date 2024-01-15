import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TEACHER_REQUEST_KEY, USER_JWT_REQUEST_KEY } from 'src/constants';
import { TeachersService } from '../teachers.service';
import { MUST_BE_A_TEACHER } from 'src/ssot/errorCodes';

@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(private teacherService: TeachersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request[USER_JWT_REQUEST_KEY];

    const relatedTeacher = await this.teacherService.findByUserId(user._id);

    if (!relatedTeacher) throw new UnauthorizedException(MUST_BE_A_TEACHER);

    request[TEACHER_REQUEST_KEY] = relatedTeacher;

    return true;
  }
}
