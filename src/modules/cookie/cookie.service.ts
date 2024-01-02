import { Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_MAX_AGE,
  LOGOUT_VAL,
} from 'src/constants';

@Injectable()
export class CookieService {
  public options: CookieOptions;

  constructor() {
    this.options = {
      secure: true,
      httpOnly: true,
      //domain: this.configService.get<string>(DOMAIN) // env
    };
  }

  setAccessToken(token: string, responseObject: Response) {
    responseObject.cookie(ACCESS_TOKEN_KEY, token, {
      ...this.options,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
  }

  removeAccessToken(responseObject: Response) {
    responseObject.cookie(ACCESS_TOKEN_KEY, LOGOUT_VAL, {
      ...this.options,
      expires: new Date(Date.now()),
    });
  }
}
