import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilters } from './middlewares/allExceptionFilter.middleware';

export function configApp(app: INestApplication) {
  app.enableCors();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilters(httpAdapter));
}
