import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProjectDto, ProjectUpdateDto } from 'src/projects/dto/project.dto';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { ProjectsService } from 'src/projects/services/projects/projects.service';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
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
  @AccessLevel(50)
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
