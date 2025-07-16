/**
 * DTO para registrar un empleado. Valida los datos de entrada de la API.
 */
import { IsNotEmpty, IsString, MaxLength, MinLength, IsEmail, IsOptional, IsBoolean, IsDateString, IsObject, ValidateNested, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

/**
 * DTO para la dirección de un empleado.
 */
export class AddressDto {
  /** Calle */
  @IsString()
  @IsNotEmpty()
  street: string;

  /** Número exterior */
  @IsString()
  @IsNotEmpty()
  externalNumber: string;

  /** Número interior (opcional) */
  @IsOptional()
  @IsString()
  internalNumber?: string | null;

  /** Colonia */
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  /** Municipio */
  @IsString()
  @IsNotEmpty()
  municipality: string;

  /** Ciudad */
  @IsString()
  @IsNotEmpty()
  city: string;

  /** Estado */
  @IsString()
  @IsNotEmpty()
  state: string;

  /** Código postal */
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  /** País */
  @IsString()
  @IsNotEmpty()
  country: string;

  /** Referencia (opcional) */
  @IsOptional()
  @IsString()
  reference?: string | null;
}

/**
 * DTO principal para alta de empleado.
 */
export class RegisterEmployeeRequestDto {
  /** ID de la sucursal */
  @IsNotEmpty()
  branchOfficeId: bigint;

  /** ID del rol */
  @IsNotEmpty()
  employeeRoleId: bigint;

  /** Nombre(s) */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  /** Apellido(s) */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  /** Email */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /** Teléfono */
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phoneNumber: string;

  /** Fecha de nacimiento (opcional) */
  @IsOptional()
  @IsDateString()
  birthDate?: string | null;

  /** Género (opcional) */
  @IsOptional()
  @IsString()
  gender?: string | null;

  /** Fecha de contratación */
  @IsDateString()
  @IsNotEmpty()
  hireDate: string;

  /** Fecha de baja (opcional) */
  @IsOptional()
  @IsDateString()
  terminationDate?: string | null;

  /** Hora de entrada (opcional) */
  @IsOptional()
  @IsString()
  entryTime?: string | null;

  /** Hora de salida (opcional) */
  @IsOptional()
  @IsString()
  exitTime?: string | null;

  /** Salario actual */
  @IsNotEmpty()
  @IsNumberString()
  currentSalary: string;

  /** Activo */
  @IsBoolean()
  isActive: boolean;

  /** URL de foto (opcional) */
  @IsOptional()
  @IsString()
  photoUrl?: string | null;

  /** Dirección */
  @IsObject()
  @Optional()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}