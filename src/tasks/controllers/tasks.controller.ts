import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskDto } from '../dto/task.dto';
import { TaskEntity } from '../entities/task.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { ApiHeader } from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create/:projectId')
  public async createTask(
    @Body() body: TaskDto,
    @Param('projectId') projectId: string,
  ) {
    return await this.tasksService.createTask(body, projectId);
  }

  @Get('all')
  public async findAllTasks(): Promise<TaskEntity[]> {
    return await this.tasksService.findAllTasks();
  }

  @Get('all/:projectId')
  public async findTasksByProjectId(@Param('projectId') projectId: string): Promise<TaskEntity[]> {
    return await this.tasksService.findTasksByProjectId(projectId);
  }

  
}
