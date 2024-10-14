import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSouerceConfig } from './config/data.source';
import { ProyectsModule } from './proyects/proyects.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({ ...DataSouerceConfig }),
    TaskModule,
    UsersModule,
    ProyectsModule,
  ],
})
export class AppModule {}
