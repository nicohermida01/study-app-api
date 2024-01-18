import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { USER_PARAM_REQUEST_KEY } from 'src/constants';

export const ReqUserParam = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[USER_PARAM_REQUEST_KEY];
  },
);
