import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-tasl.dto';
import { log } from 'console';

@Controller('/tasks')
export class TaskController {
  taskService: TaskService;
  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: string) {
    
    return this.taskService.getTask(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTask(@Body() task: CreateTaskDto) {
    return this.taskService.createTask(task);
  }

  @Put()
  updateTask(@Body() task: UpdateTaskDto) {
    console.log(task);
    
    return this.taskService.updateTask(task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id')
  updateTaskStatus(@Param('id') id: string) {
    return this.taskService.updateTaskStatus(id);
  }
}                             