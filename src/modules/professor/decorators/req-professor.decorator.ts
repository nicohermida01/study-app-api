import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { PROFESSOR_REQUEST_KEY } from 'src/constants';

export const ReqProfessor = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[PROFESSOR_REQUEST_KEY];
  },
);
