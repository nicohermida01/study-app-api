import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { USER_JWT_REQUEST_KEY } from 'src/constants';

export const ReqUserJwt = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[USER_JWT_REQUEST_KEY];
  },
);
