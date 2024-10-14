import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-tasl.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { TaskDocument } from './schemas/task.schema';
import { log } from 'console';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  private createResponse(statusCode: number, message: string, tasks: any) {
    return {
      statusCode: statusCode,
      message: message,
      tasks: tasks,
    };
  }

  async getAllTasks() {
    try {
      const tasksFind = await this.taskModel.find();
      return this.createResponse(
        HttpStatus.OK,
        'Tasks retrieved successfully',
        tasksFind,
      );
    } catch (error) {
      throw new BadRequestException({ message: error });
    }
  }

  async getTask(id: string) {
    try {
        const task =  await this.taskModel.findById(id);
        return this.createResponse(
          HttpStatus.OK,
          'Task retrieved successfully',
          task,
        );
        
    } catch (error) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'An error occurred while retrieving the task',
          task: null
        });
    }
  }

  async createTask(task: CreateTaskDto) {
    try {
      const createdTask = await this.taskModel.create(task);
      return createdTask;
    } catch (error) {
     throw new BadRequestException({
       statusCode: HttpStatus.BAD_REQUEST,
       message: 'An error occurred while retrieving the task',
       task: null,
     });
    }
  }

  async updateTask(task: UpdateTaskDto) {
    try {
        const taskUpdate = await this.taskModel.findByIdAndUpdate(task._id, task, {new: true});
        return this.createResponse(
          HttpStatus.OK,
          'Task updated successfully',
          taskUpdate
        )
    } catch (error) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'An error occurred while updating the task',
          task: null,
        });
    }
  }

  async deleteTask(id: string) {
    try {
        const taskDelete = await this.taskModel.findByIdAndDelete(id);
        return this.createResponse(
          HttpStatus.OK,
          'Task deleted successfully',
          taskDelete
        )
        
    } catch (error) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'An error occurred while deleting the task',
          task: null,
        });
    }
  }

  async updateTaskStatus(id: string) {
    try {
        const task = await this.taskModel.findById(id);
        task.status = !task.status;
        task.save();
        return this.createResponse(
          HttpStatus.OK,
          'Task updated successfully',
          task
        )
        
    } catch (error) {
         throw new BadRequestException({
           statusCode: HttpStatus.BAD_REQUEST,
           message: 'An error occurred while update status task',
           task: null,
         });
    }
  }
}
