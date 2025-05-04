import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateEstablishmentHttpDTO{
    @MinLength(2)
    @IsNotEmpty()
    @IsString()
    name: string;
}