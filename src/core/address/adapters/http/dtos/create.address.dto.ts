import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDTO{
    @IsInt()
    @IsNotEmpty()
    postalCode: number;
    @IsString()
    @IsNotEmpty()
    street: string;
    @IsString()
    @IsNotEmpty()
    interiorNumber: string;
    @IsString()
    @IsNotEmpty()
    exteriorNumber: string;
    @IsString()
    @IsNotEmpty()
    district: string;
    @IsString()
    @IsNotEmpty()
    city: string;
    @IsString()
    @IsNotEmpty()
    state: string;
}