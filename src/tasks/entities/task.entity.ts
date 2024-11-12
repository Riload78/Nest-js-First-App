import { BaseEntity } from "../../config/base.entity";
import { STATUS_TASK } from "../../constants/status-task";
import { ProjectsEntity } from "../../projects/entities/projects.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { TasksProjectsEntity } from "./tasksProjects.entity";

@Entity({ name: 'task' })
export class TaskEntity extends BaseEntity {
  @Column()
  taskName: string;

  @Column()
  taskDescription: string;

  @Column({
    type: 'enum',
    enum: STATUS_TASK,
  })
  status: STATUS_TASK;

  @Column()
  responsableName: string;

/*   @ManyToOne(() => ProjectsEntity, (project) => project.tasksIncludes)
  @JoinColumn({ name: 'project_id' })
  project: ProjectsEntity; */

  @OneToMany(() => TasksProjectsEntity, (tasksProjects) => tasksProjects.task)
  tasksProjects: TasksProjectsEntity[];
}