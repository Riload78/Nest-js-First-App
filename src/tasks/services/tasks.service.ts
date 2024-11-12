import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { TaskDto } from '../dto/task.dto';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { ErrorManager } from 'src/utils/error.manager';
import { TasksProjectsEntity } from 'src/tasks/entities/tasksProjects.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity) 
        private readonly taskrepository: Repository<TaskEntity>,
        private readonly projectsService: ProjectsService,
        @InjectRepository(TasksProjectsEntity)
        private readonly tasksProjectsRepository: Repository<TasksProjectsEntity>,
    ) {}

    public async createTask(
        body: TaskDto,
        projectId: string,
    ) {
        try {
            const project = await this.projectsService.findProjectById(projectId)
            if (!project) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'Project not found',
                });
            }
            const task = await this.taskrepository.save(body);

            return await this.tasksProjectsRepository.save({
                task: task,
                project: project
            })

            
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findAllTasks(): Promise<TaskEntity[]> {
        try {
            const tasks: TaskEntity[] = await this.taskrepository.find();
            if (tasks.length === 0) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'Tasks not found',
                });
            }
            return tasks;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findTasksByProjectId(projectId: string): Promise<TaskEntity[]> {
        try {
            const tasks: TaskEntity[] = await this.taskrepository
              .createQueryBuilder('tasks')
              .leftJoinAndSelect('tasks.tasksProjects', 'tasksProjects')
              .leftJoinAndSelect('tasksProjects.project', 'projects')
              .where('projects.id = :projectId', { projectId })
              .getMany();

            if (tasks.length === 0) {
              throw new ErrorManager({
                type: 'NOT_FOUND',
                message: 'Tasks not found',
              });
            }
            return tasks;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }  
}
