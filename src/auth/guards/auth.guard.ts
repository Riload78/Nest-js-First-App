import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/services/users.service';
import { useToken } from 'src/utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly UsersService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    //
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
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
    req.role = user.role;
    return true;
  }
}
