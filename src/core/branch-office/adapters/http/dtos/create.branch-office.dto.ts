import { IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class CreateBranchOfficeDTO{
    @IsNumber()
    @IsNotEmpty()
    addressId: bigint;
    @IsNumber()
    @IsNotEmpty()
    educationalCenterId: bigint;
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;
}