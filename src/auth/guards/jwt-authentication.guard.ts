import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
}
