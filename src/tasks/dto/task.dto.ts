import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { STATUS_TASK } from "src/constants/status-task";
import { ProjectDto } from "src/projects/dto/project.dto";

export class TaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Task name must be at least 10 characters long' })
  taskName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Task description must be at least 10 characters long',
  })
  @ApiProperty()
  @IsString()
  taskDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  responsableName: string;

}