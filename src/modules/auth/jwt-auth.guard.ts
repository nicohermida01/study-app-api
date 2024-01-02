import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /* canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      // para verificar si el token es de un usuario en especifico, etc ..
  } */
}
