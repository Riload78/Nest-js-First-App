import { Module } from '@nestjs/common';
import { ProyectsController } from './controllers/proyects/proyects.controller';
import { ProyectsService } from './services/proyects/proyects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectsEntity } from './entities/proyects.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProyectsEntity]),
  ],
  controllers: [ProyectsController],
  providers: [ProyectsService]
})
export class ProyectsModule {}
