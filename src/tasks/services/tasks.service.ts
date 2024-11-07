import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { TaskDto } from '../dto/task.dto';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity) 
        private readonly taskrepository: Repository<TaskEntity>,
        private readonly projectsService: ProjectsService
    ) {}

    public async createTask(
        body: TaskDto,
        projectId: string,
    ) : Promise<TaskEntity> {
        try {
            const project = await this.projectsService.findProjectById(projectId)
            if (!project) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'Project not found',
                });
            }
            return await this.taskrepository.save({
                ...body,
                project: project
            });
            
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
