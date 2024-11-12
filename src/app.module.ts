import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSouerceConfig } from './config/data.source';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import  { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port:8001
    }),
    TypeOrmModule.forRoot({ ...DataSouerceConfig }), 
    UsersModule,
    ProjectsModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
