import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { ProjectsService } from 'src/projects/services/projects/projects.service';
import { TasksProjectsEntity } from './entities/tasksProjects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ProjectsEntity, TasksProjectsEntity])],
  providers: [TasksService, ProjectsService],
  controllers: [TasksController]
})
export class TasksModule {}
