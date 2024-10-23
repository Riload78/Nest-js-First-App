import { BaseEntity } from "../../config/base.entity";
import { ROLES } from "../../constants/roles";
import { Exclude } from "class-transformer";
import { IUser } from "../../interfaces/user.interface";
import { Column, Entity, OneToMany } from "typeorm";
import { UsersProjectsEntity } from "./usersProjects.entity";

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  age: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ROLES,
  })
  role: ROLES;
  @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.user)
  projectsIncludes: UsersProjectsEntity[];
}   
    