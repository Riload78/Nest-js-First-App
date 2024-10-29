import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UsersService } from 'src/users/services/users.service';
import { useToken } from 'src/utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';
import { PUBLIC_KEY } from 'src/constants/key-decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly UsersService: UsersService,
    private readonly reflector: Reflector, // permite leer los decoradores
  ) {}
  async canActivate(context: ExecutionContext) {
    //
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['codrr_token']
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token');
    }
    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string')
      throw new UnauthorizedException(manageToken);

    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }

    const { sub } = manageToken;
    const user = await this.UsersService.findUserById(sub);
    if (!user) {
      throw new UnauthorizedException('Invalid User');
    }

    req.idUser = user.id;
    req.roleUser = user.role;
    return true;
  }
}
