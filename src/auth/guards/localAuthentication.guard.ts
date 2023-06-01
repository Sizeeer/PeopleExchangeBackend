import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('local') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err?.status === 400) {
      throw new UnauthorizedException('Неверный логин или пароль!');
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
