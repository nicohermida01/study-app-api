import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { TEACHER_REQUEST_KEY } from 'src/constants';

export const ReqTeacher = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[TEACHER_REQUEST_KEY];
  },
);
