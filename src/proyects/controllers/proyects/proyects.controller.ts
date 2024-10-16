import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProyectDto, ProyectUpdateDto } from 'src/proyects/dto/proyect.dto';
import { ProyectsEntity } from 'src/proyects/entities/proyects.entity';
import { ProyectsService } from 'src/proyects/services/proyects/proyects.service';

@Controller('proyects')
export class ProyectsController {
  constructor(private readonly proyectsService: ProyectsService) {}

  @Post('create')
  public async createProyect(
    @Body() body: ProyectDto,
  ): Promise<ProyectsEntity> {
    return await this.proyectsService.createProyect(body);
  }

  @Get('all')
  public async findAllProyects(): Promise<ProyectsEntity[]> {
    return await this.proyectsService.findAllProyects();
  }

  @Get(':id')
  public async findProyectById(
    @Param('id') id: string,
  ): Promise<ProyectsEntity> {
    return await this.proyectsService.findProyectById(id);
  }

  @Put('edit/:id')
  public async updateProyect(
    @Param('id') id: string,
    @Body() body: ProyectUpdateDto,
  ) {
    return await this.proyectsService.updateProyect(id, body);
  }

  @Delete('delete/:id')
  public async deleteProyect(@Param('id') id: string) {
    return await this.proyectsService.deleteProyect(id);
  }
}
