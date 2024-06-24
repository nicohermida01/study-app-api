import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilters } from './middlewares/allExceptionFilter.middleware';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

export function configApp(app: INestApplication) {
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3005'],
    }),
  );

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new AllExceptionsFilters(app.get(HttpAdapterHost)));

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
}
