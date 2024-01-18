import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ProfessorService } from '../professor.service';
import { PROFESSOR_REQUEST_KEY, USER_JWT_REQUEST_KEY } from 'src/constants';
import { MUST_BE_A_PROFESSOR } from 'src/ssot/errorCodes';

@Injectable()
export class ProfessorGuard implements CanActivate {
  constructor(private professorService: ProfessorService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request[USER_JWT_REQUEST_KEY];

    const professor = await this.professorService.findByUserId(user._id);

    if (!professor) throw new UnauthorizedException(MUST_BE_A_PROFESSOR);

    request[PROFESSOR_REQUEST_KEY] = professor;

    return true;
  }
}
