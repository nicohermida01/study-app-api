import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ReqUserAuth = createParamDecorator(
  (_, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const user = request.user;

    return user.userId;
  },
);
