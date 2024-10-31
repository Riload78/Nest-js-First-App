import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ACCESS_LEVEL } from 'src/constants';
import { ProjectDto, ProjectUpdateDto } from 'src/projects/dto/project.dto';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { UsersService } from 'src/users/services/users.service';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectsRepository: Repository<ProjectsEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly usersProjectsRepository: Repository<UsersProjectsEntity>,
    private readonly usersService: UsersService,
  ) {}

  public async createProject(body: ProjectDto, userId: string): Promise<any> {
    try {
      const user = await this.usersService.findUserById(userId)
      const project = await this.projectsRepository.save(body)
      return await this.usersProjectsRepository.save({
        project: project,
        user: user,
        access_level: ACCESS_LEVEL.OWNER
      })
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllProjects(): Promise<ProjectsEntity[]> {
    try {
      const projects: ProjectsEntity[] = await this.projectsRepository.find();
      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Projects not found',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      const project: ProjectsEntity = await this.projectsRepository
        .createQueryBuilder('projects')
        .where({ id })
        .leftJoinAndSelect('projects.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'users')
        .getOne();
      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Project not found',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateProject(
    id: string,
    body: ProjectUpdateDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectsRepository.update(
        id,
        body,
      );
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Cannot update project',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

	public async deleteProject(id: string): Promise<DeleteResult | undefined> {
		try {
			const project: DeleteResult = await this.projectsRepository.delete(id);
			if (project.affected === 0) {
				throw new ErrorManager({
					type: 'BAD_REQUEST',
					message: 'Cannot delete project',
				});
			}
			return project;	
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}
}
