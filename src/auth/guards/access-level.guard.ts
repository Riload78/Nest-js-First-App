import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ACCESS_LEVEL, ROLES } from 'src/constants';
import { ACCESS_LEVEL_KEY, ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly UsersService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ) {
  const isPublic = this.reflector.get<boolean>(
    PUBLIC_KEY, 
    context.getHandler()
  );

  if (isPublic) {
    return true;
  }

  const roles = this.reflector.get<Array<keyof typeof ROLES>>(
    ROLES_KEY,
    context.getHandler(),
  );

  const accesLevel = this.reflector.get<keyof typeof ACCESS_LEVEL>(
    ACCESS_LEVEL_KEY,
    context.getHandler(),
  );

  const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

  const req = context.switchToHttp().getRequest<Request>();
  const { roleUser, idUser } = req;
  if(accesLevel === undefined) {
    
    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && roleUser === ROLES.ADMIN) {
        return true;
      } else {
        throw new UnauthorizedException('Don`t have permissions');
      }
    }
  }

   if (roleUser === ROLES.ADMIN) {
     return true;
   }

   const user = await this.UsersService.findUserById(idUser)
   const userExistInProject = user.projectsIncludes.find(
    (project) => project.project.id === req.params.id
   )

   if (!userExistInProject) {
    throw new UnauthorizedException('Don`t have permissions');
   }

   if (ACCESS_LEVEL[accesLevel] > userExistInProject.access_level) {
     throw new UnauthorizedException('Don`t have permissions');
   }

    
    return true;
  }
}
