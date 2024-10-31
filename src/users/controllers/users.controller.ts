import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserToProjectDto, UserUpdateDTO } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/constants';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async registerUser(@Body() body: UserDTO): Promise<UsersEntity> {
    return await this.usersService.createUser(body);
  }

  @AdminAccess()
  @Get('all')
  public async findAllUsers(): Promise<UsersEntity[]> {
    return await this.usersService.findUsers();
  }

  @PublicAccess()
  @Get(':id')
  public async findUserById(@Param('id') id: string): Promise<UsersEntity> {
    return await this.usersService.findUserById(id);
  }

  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(id, body);
  }

  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }

  @Post('add-to-project')
  public async addUserToProject(@Body() body: UserToProjectDto) {
    return await this.usersService.relationToProject(body);
  }
}
