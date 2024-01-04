import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  DEFAULT_MESSAGE_ERROR,
  MONGOOSE_CAST_ERROR_MESSAGE,
} from 'src/ssot/errorMessages';
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

    let message;
    let httpStatus;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      message = exception.getResponse()['message'];
    } else if (exception.name === MONGOOSE_VALIDATION_ERROR) {
      httpStatus = 400;
      message = exception.errors[Object.keys(exception.errors)[0]].message;
    } else if (exception.name === MONGOOSE_CAST_ERROR) {
      httpStatus = 400;
      message = MONGOOSE_CAST_ERROR_MESSAGE;
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = DEFAULT_MESSAGE_ERROR;
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
