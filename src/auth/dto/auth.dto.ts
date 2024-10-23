import { IsNotEmpty, IsString } from "class-validator";
import { IAuthBody } from "../interfaces/auth.interface";

export class AuthDto implements IAuthBody {
    @IsNotEmpty()
    username: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}