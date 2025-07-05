import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

/**
 * RegisterBranchOfficeRequestDto es un Data Transfer Object (DTO)
 * de la capa de Presentación. Se utiliza para la validación de las solicitudes HTTP
 * entrantes para el registro de un centro educativo.
 *
 * Contiene decoradores de 'class-validator' y '@nestjs/swagger' para la validación
 * y documentación automática de la API.
 */
export class RegisterSuplierRequestDto {
    @IsString({ message: 'El nombre no puede ser un número.' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @MinLength(3, { message: 'El nombre debe tener como mínimo 3 caracteres.' })
    @MaxLength(150, { message: 'El nombre no debe ser mayor a 150 caracteres.' })
    name: string;
    @IsString({ message: 'El número de teléfono es una cadena numerica.' })
    @IsNotEmpty({ message: 'El número de teléfono no puede estar vacío.' })
    @MinLength(3, { message: 'El número de teléfono debe tener como mínimo 3 caracteres.' })
    @MaxLength(25, { message: 'El número de teléfono no debe ser mayor a 25 caracteres.' })
    phoneNumber: string;
    @IsOptional()
    @IsString({ message: 'El RFC es una cadena alfanumerica.' })
    @MinLength(3, { message: 'El RFC debe tener como mínimo 3 caracteres.' })
    @MaxLength(13, { message: 'El RFC no debe ser mayor a 13 caracteres.' })
    rfc?: string | null;
    @IsOptional()
    @IsString({ message: 'El nombre de la persona de contacto es una cadena de texto.' })
    @MinLength(3, { message: 'El nombre de la persona de contacto debe tener como mínimo 3 caracteres.' })
    @MaxLength(100, { message: 'El nombre de la persona de contacto no debe ser mayor a 100 caracteres.' })
    contactPerson?: string | null;
    @IsOptional()
    @IsEmail({},{ message: "El correo electrónico debe tener la estrcutura 'ejemplo@domain.com'" })
    @MinLength(3, { message: 'El correo electrónico debe tener como mínimo 3 caracteres.' })
    @MaxLength(100, { message: 'El correo electrónico no debe ser mayor a 100 caracteres.' })
    email?: string | null;
    @IsOptional()
    @IsString({ message: 'Las notas extras es una cadena de texto.' })
    @MinLength(3, { message: 'Las notas extras debe tener como mínimo 3 caracteres.' })
    @MaxLength(1000, { message: 'Las notas extras no debe ser mayor a 1000 caracteres.' })
    notes?: string | null;
    @IsString({ message: 'El nombre de la calle no puede ser un número.' })
    @IsNotEmpty({ message: 'La calle no puede ir vacia.' })
    @MinLength(3, { message: 'La calle debe tener como mínimo 3 caracteres.' })
    @MaxLength(255, { message: 'La calle no puede tener mas de 255 caracteres.' })
    street: string; // Calle
    @IsString({ message: 'El numero exterior debe ser una cadena numerica' })
    @IsNotEmpty({ message: 'El número exterior no puede ir vacio.' })
    @MinLength(1, { message: 'El numero exterior debe tener como mínimo 1 dígito/caracter.' })
    @MaxLength(20, { message: 'El número exterior no puede tener mas de 20 caracteres.' })
    externalNumber: string; // Número exterior
    @IsOptional()
    @IsString({ message: 'El numero interior debe ser una cadena numerica' })
    @MinLength(1, { message: 'El numero interior debe tener como mínimo 1 dígito/caracter.' })
    @MaxLength(20, { message: 'El número interior no puede tener mas de 20 caracteres.' })
    internalNumber?: string | null; // Número Interior Opcional
    @IsString({ message: 'El municipio debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El municipio no puede ir vacio.' })
    @MinLength(3, { message: 'El municipio debe tener como mínimo 3 caracteres.' })
    @MaxLength(100, { message: 'El municipio no puede tener mas de 100 caracteres.' })
    municipality: string; // Municipio
    @IsString({ message: 'El colonia debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El colonia no puede ir vacio.' })
    @MinLength(3, { message: 'El colonia debe tener como mínimo 3 caracteres.' })
    @MaxLength(100, { message: 'El colonia no puede tener mas de 100 caracteres.' })
    neighborhood: string; // Municipio
    @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La ciudad no puede ir vacio.' })
    @MinLength(3, { message: 'La ciudad debe tener como mínimo 3 caracteres.' })
    @MaxLength(100, { message: 'La ciudad no puede tener mas de 100 caracteres.' })
    city: string; // Ciudad
    @IsString({ message: 'El estado debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El estado no puede ir vacio.' })
    @MinLength(3, { message: 'El estado debe tener como mínimo 3 caracteres.' })
    @MaxLength(100, { message: 'El estado no puede tener mas de 100 caracteres.' })
    state: string; // 
    @IsString({ message: 'El codigo postal debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El codigo postal no puede ir vacio.' })
    @MinLength(1, { message: 'El codigo postal debe tener como mínimo 1 caracter.' })
    @MaxLength(10, { message: 'El codigo postal no puede tener mas de 10 caracteres.' })
    postalCode: string; // Código Postal
    @IsString({ message: 'El país debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El país no puede ir vacio.' })
    @MinLength(3, { message: 'El país debe tener como mínimo 3 caracteres.' })
    @MaxLength(100, { message: 'El país no puede tener mas de 100 caracteres.' })
    country: string; // País
    @IsOptional()
    @IsString({ message: 'La referencia debe ser una cadena de texto.' })
    @MinLength(3, { message: 'La referencia debe tener como mínimo 3 caracteres.' })
    reference?: string|null; // Referencia
  }