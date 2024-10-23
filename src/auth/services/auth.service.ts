import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/entities/users.entity';
import { PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly UsersService: UsersService) {}
  public async validateUser(username: string, password: string): Promise<any> {
    const userByUsername = await this.UsersService.findBy({
      key: 'username',
      value: username,
    });
    const userByEmail = await this.UsersService.findBy({
      key: 'email',
      value: username,
    });
    if (userByUsername) {
      const isMatch = await bcrypt.compare(password, userByUsername.password);
      if (isMatch) {
        return userByUsername;
      }
    } 
	if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password);
      if (isMatch) {
        return userByEmail;
      }
    }
	return null;
  }

  public async signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async genreateJWT(user: UsersEntity): Promise<object> {
    const getUser = await this.UsersService.findUserById(user.id);
    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };
    return {
      accessToken: await this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user,
    };
  }
}
