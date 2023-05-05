import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { ROLES } from 'src/constants/roles';

export const RoleGuard = (...roles: ROLES[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      console.log('user', user);

      return roles.includes(user.roleid);
    }
  }

  return mixin(RoleGuardMixin);
};
