import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CLASSROOM_REQUEST_KEY } from 'src/constants';

export const ReqClassroom = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[CLASSROOM_REQUEST_KEY];
  },
);
