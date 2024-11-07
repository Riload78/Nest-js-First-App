import { Body, Controller, Param, Post } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskDto } from '../dto/task.dto';
import { TaskEntity } from '../entities/task.entity';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ) {}

    @Post('create/:projectId')
    public async createTask(
        @Body() body: TaskDto,
        @Param('projectId') projectId: string
    )  {
        return await this.tasksService.createTask(body, projectId);
    }


}
