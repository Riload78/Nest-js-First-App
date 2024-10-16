import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectDto, ProyectUpdateDto } from 'src/proyects/dto/proyect.dto';
import { ProyectsEntity } from 'src/proyects/entities/proyects.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProyectsService {
  constructor(
    @InjectRepository(ProyectsEntity)
    private readonly proyectsRepository: Repository<ProyectsEntity>,
  ) {}

  public async createProyect(body: ProyectDto): Promise<ProyectsEntity> {
    try {
      return await this.proyectsRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllProyects(): Promise<ProyectsEntity[]> {
    try {
      const proyects: ProyectsEntity[] = await this.proyectsRepository.find();
      if (proyects.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Proyects not found',
        });
      }
      return proyects;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProyectById(id: string): Promise<ProyectsEntity> {
    try {
      const proyect: ProyectsEntity = await this.proyectsRepository
        .createQueryBuilder('proyects')
        .where({ id })
        .getOne();
      if (!proyect) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Proyect not found',
        });
      }
      return proyect;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateProyect(
    id: string,
    body: ProyectUpdateDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const proyect: UpdateResult = await this.proyectsRepository.update(
        id,
        body,
      );
      if (proyect.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Cannot update proyect',
        });
      }
      return proyect;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

	public async deleteProyect(id: string): Promise<DeleteResult | undefined> {
		try {
			const proyect: DeleteResult = await this.proyectsRepository.delete(id);
			if (proyect.affected === 0) {
				throw new ErrorManager({
					type: 'BAD_REQUEST',
					message: 'Cannot delete proyect',
				});
			}
			return proyect;	
		} catch (error) {
			throw ErrorManager.createSignatureError(error.message);
		}
	}
}
