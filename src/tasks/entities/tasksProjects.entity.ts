import { IsString } from "class-validator";
import { BaseEntity } from "../../config/base.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { TaskEntity } from "./task.entity";
import { ProjectsEntity } from "../../projects/entities/projects.entity";

@Entity('tasks_projects')
export class TasksProjectsEntity extends BaseEntity {
  @ManyToOne(() => TaskEntity, (task) => task.tasksProjects, { eager: true })
  task: TaskEntity;

  @ManyToOne(() => ProjectsEntity, (project) => project.tasksProjects, {
    eager: true,
  })
  project: ProjectsEntity;
}