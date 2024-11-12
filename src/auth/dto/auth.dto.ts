import { IsNotEmpty, IsString } from "class-validator";
import { IAuthBody } from "../interfaces/auth.interface";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto implements IAuthBody {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}