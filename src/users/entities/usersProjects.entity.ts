import { BaseEntity } from "../../config/base.entity"
import { ACCESS_LEVEL } from "../../constants"
import { Column, Entity, ManyToOne } from "typeorm"
import { UsersEntity } from "./users.entity"
import { ProyectsEntity } from "../../proyects/entities/proyects.entity";

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ACCESS_LEVEL,
  })
  access_level: ACCESS_LEVEL;

  @ManyToOne(() => UsersEntity, (user) => user.projectsIncludes)
  user: UsersEntity;

  @ManyToOne(() => ProyectsEntity, (project) => project.usersIncludes)
  project: ProyectsEntity;
}