import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { COURSE_REQUEST_KEY } from 'src/constants';

export const ReqCourseParam = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[COURSE_REQUEST_KEY];
  },
);
