import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  INTERNAL_SERVER_ERROR,
  MONGOOSE_ID_CAST_ERROR,
} from 'src/ssot/errorCodes';

import {
  MONGOOSE_CAST_ERROR,
  MONGOOSE_VALIDATION_ERROR,
} from 'src/ssot/errors';

@Catch()
export class AllExceptionsFilters implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let errorCode;
    let httpStatus;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      errorCode = exception.getResponse()['message'];
    } else if (exception.name === MONGOOSE_VALIDATION_ERROR) {
      httpStatus = 400;
      errorCode = exception.errors[Object.keys(exception.errors)[0]].message;
    } else if (exception.name === MONGOOSE_CAST_ERROR) {
      httpStatus = 400;
      errorCode = MONGOOSE_ID_CAST_ERROR;
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      errorCode = INTERNAL_SERVER_ERROR;
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      errorCode,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
