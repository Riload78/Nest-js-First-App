import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator"

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean

}