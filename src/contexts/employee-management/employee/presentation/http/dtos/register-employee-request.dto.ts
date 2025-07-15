import { IsNotEmpty, IsString, MaxLength, MinLength, IsEmail, IsOptional, IsBoolean, IsDateString, IsObject, ValidateNested, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  externalNumber: string;

  @IsOptional()
  @IsString()
  internalNumber?: string | null;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  municipality: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsString()
  reference?: string | null;
}

/**
 * RegisterEmployeeRoleRequestDto es un Data Transfer Object (DTO)
 * de la capa de Presentación. Se utiliza para la validación de las solicitudes HTTP
 * entrantes para el registro de un establesimiento.
 *
 * Contiene decoradores de 'class-validator' y '@nestjs/swagger' para la validación
 * y documentación automática de la API.
 */
export class RegisterEmployeeRequestDto {
  @IsNotEmpty()
  branchOfficeId: bigint;

  @IsNotEmpty()
  employeeRoleId: bigint;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phoneNumber: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string | null;

  @IsOptional()
  @IsString()
  gender?: string | null;

  @IsDateString()
  @IsNotEmpty()
  hireDate: string;

  @IsOptional()
  @IsDateString()
  terminationDate?: string | null;

  @IsOptional()
  @IsString()
  entryTime?: string | null;

  @IsOptional()
  @IsString()
  exitTime?: string | null;

  @IsNotEmpty()
  @IsNumberString()
  currentSalary: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  photoUrl?: string | null;

  @IsObject()
  @Optional()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}