import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserToProjectDto, UserUpdateDTO } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    public async registerUser(@Body() body: UserDTO): Promise<UsersEntity> {        
        return await this.usersService.createUser(body);
    }

    @Get('all')
    public async findAllUsers(): Promise<UsersEntity[]> {
        return await this.usersService.findUsers();
    }

    @Get(':id')
    public async findUserById(@Param('id') id: string): Promise<UsersEntity> {
        return await this.usersService.findUserById(id);
    }

    @Put('edit/:id')
    public async updateUser(@Param('id') id: string, @Body() body: UserUpdateDTO) {
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
