import { TaskEntity } from "../../tasks/entities/task.entity";
import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../../interfaces/project.interface";
import { UsersProjectsEntity } from "../../users/entities/usersProjects.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { TasksProjectsEntity } from "../../tasks/entities/tasksProjects.entity";

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => UsersProjectsEntity,
    (usersProjects) => usersProjects.project,
  )
  usersIncludes: UsersProjectsEntity[];

  /* @OneToMany(() => TaskEntity, (task) => task.project)
  tasksIncludes: TaskEntity[]; */

  @OneToMany(
    () => TasksProjectsEntity,
    (tasksProjects) => tasksProjects.project,
  )
  tasksProjects: TasksProjectsEntity[];
}