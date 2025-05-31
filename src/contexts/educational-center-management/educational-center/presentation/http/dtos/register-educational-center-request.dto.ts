import { IsNotEmpty, IsString, MaxLength, Min, MinLength } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

/**
 * RegisterEstablishmentRequestDto es un Data Transfer Object (DTO)
 * de la capa de Presentación. Se utiliza para la validación de las solicitudes HTTP
 * entrantes para el registro de un establesimiento.
 *
 * Contiene decoradores de 'class-validator' y '@nestjs/swagger' para la validación
 * y documentación automática de la API.
 */
export class RegisterEstablishmentRequestDto {
  // @ApiProperty({
  //   description: 'El nombre de un establesimiento',
  //   example: 'Awesome Learning Academy',
  //   maxLength: 250,
  // })
  @IsString({ message: 'El nombre no puede ser un número.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @MinLength(3, { message: 'El nombre debe tener como mínimo 3 caracteres.' })
  @MaxLength(250, { message: 'El nombre no debe ser mayor a 250 caracteres.' })
  name: string;
}