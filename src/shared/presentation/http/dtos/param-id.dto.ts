// src/shared/presentation/http/dtos/param-id.dto.ts

import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

/**
 * ParamIdDto es un Data Transfer Object (DTO) genérico de la capa de Presentación
 * para validar parámetros de ID en las rutas HTTP.
 *
 * Contiene decoradores de 'class-validator' y '@nestjs/swagger'.
 */
export class ParamIdDto {
  // @ApiProperty({
  //   description: 'The ID of the resource (as a string, since BigInt is not natively supported in URL parameters).',
  //   example: '123456789012345678', // Un ejemplo de BigInt como string
  // })
  @IsString({ message: 'El id debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El id no puede ir vacio.' })
  @IsNumberString({}, { message: 'ID debe ser una cadena numerica' }) // Asegura que el string contenga solo números
  readonly id: string;
}