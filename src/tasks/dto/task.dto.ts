import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { STATUS_TASK } from "src/constants/status-task";
import { ProjectDto } from "src/projects/dto/project.dto";

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Task name must be at least 10 characters long' })
  taskName: string;

  @IsNotEmpty()
  @MinLength(10, {
    message: 'Task description must be at least 10 characters long',
  })
  @IsString()
  taskDescription: string;

  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @IsNotEmpty()
  @IsString()
  responsableName: string;

  @IsNotEmpty()
  @IsString()
  project: ProjectDto;
}