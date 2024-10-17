import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectDto, ProjectUpdateDto } from 'src/projects/dto/project.dto';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { ProjectsService } from 'src/projects/services/projects/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  public async createProject(
    @Body() body: ProjectDto,
  ): Promise<ProjectsEntity> {
    return await this.projectsService.createProject(body);
  }

  @Get('all')
  public async findAllProjects(): Promise<ProjectsEntity[]> {
    return await this.projectsService.findAllProjects();
  }

  @Get(':id')
  public async findProjectById(
    @Param('id') id: string,
  ): Promise<ProjectsEntity> {
    return await this.projectsService.findProjectById(id);
  }

  @Put('edit/:id')
  public async updateProject(
    @Param('id') id: string,
    @Body() body: ProjectUpdateDto,
  ) {
    return await this.projectsService.updateProject(id, body);
  }

  @Delete('delete/:id')
  public async deleteProject(@Param('id') id: string) {
    return await this.projectsService.deleteProject(id);
  }
}
