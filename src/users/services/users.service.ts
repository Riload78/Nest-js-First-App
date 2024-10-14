import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      return await this.usersRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUserById(id: string): Promise<UsersEntity> {
    try {
      return await this.usersRepository.createQueryBuilder('users')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateUser(id: string, body: UserUpdateDTO): Promise<UpdateResult> {
    try {
        const user : UpdateResult = await this.usersRepository.update(id, body);
      if(user.affected === 0) {
          return undefined
      }
      return user
    } catch (error) {
      throw new Error(error);
    }
  }
}
