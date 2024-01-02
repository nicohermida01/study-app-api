import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilters } from './middlewares/allExceptionFilter.middleware';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

export function configApp(app: INestApplication) {
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000'],
    }),
  );

  app.setGlobalPrefix('api');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilters(httpAdapter));

  app.use(cookieParser());
}
