import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES } from 'src/constants';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, // permite leer los decoradores
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler()
    )
    
    const admin = this.reflector.get<string>(
      ADMIN_KEY,
      context.getHandler()
    )

    const req = context.switchToHttp().getRequest<Request>()
    const {roleUser} = req
    if (roles === undefined) {
      if (!admin) {
        return true;
      }
      else if (admin && roleUser === ROLES.ADMIN) {
        return true;
      } else {
        throw new UnauthorizedException('Don`t have permissions');
      }
    }

    if (roleUser === ROLES.ADMIN) {
      return true
    }

    const isAuthorized = roles.some((role) => roleUser === role);
    if (!isAuthorized) {
      throw new UnauthorizedException('Don`t have permissions');
    }
    return true;
  }
}
