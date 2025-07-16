// src/shared/presentation/http/dtos/param-id.dto.ts

import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

/**
 * DTO para validar el parámetro de ID en rutas HTTP.
 */
export class ParamIdDto {
  /** ID del recurso (como string numérico) */
  @IsString({ message: 'El id debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El id no puede ir vacio.' })
  @IsNumberString({}, { message: 'ID debe ser una cadena numerica' })
  readonly id: string;
}