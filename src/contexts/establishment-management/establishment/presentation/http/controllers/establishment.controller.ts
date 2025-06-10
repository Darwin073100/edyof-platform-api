// src/contexts/educational-center-management/educational-center/presentation/http/controllers/educational-center.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
// import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'; // Para documentación de Swagger (opcional, pero buena práctica)
import { RegisterEstablishmentUseCase } from '../../../application/use-cases/register-establishment.use-case';
import { FindEstablishmentByIdUseCase } from '../../../application/use-cases/find-establishment-by-id.use-case';
import { RegisterEstablishmentDto } from '../../../application/dtos/register-establishment.dto'; // DTO de entrada de la aplicación
import { EstablishmentResponseDto } from '../../../application/dtos/establishment-response.dto'; // DTO de salida de la aplicación
import { EstablishmentMapper } from '../../../application/mappers/educational-center.mapper';

// DTOs específicos de presentación para validación con class-validator (opcional, pero es común)
import { RegisterEstablishmentRequestDto } from '../dtos/register-educational-center-request.dto';
import { ParamIdDto } from 'src/shared/presentation/http/dtos/param-id.dto';
import { InvalidNameException } from '../../../domain/exceptions/invalid-name.exception';
import { EstablishmentAlreadyExistsException } from '../../../domain/exceptions/establishment-already-exists.exception';

/**
 * EducationalCenterController es el controlador de NestJS que maneja las solicitudes HTTP
 * relacionadas con la gestión de centros educativos.
 *
 * Es parte de la capa de Presentación y actúa como un Adaptador que convierte
 * solicitudes HTTP en llamadas a Casos de Uso de la capa de Aplicación.
 */
// @ApiTags('Educational Centers') // Etiqueta para Swagger
@Controller('establishments') // Ruta base para este controlador
export class EstablishmentController {
  constructor(
    // Inyectamos los Casos de Uso. El controlador no tiene lógica de negocio.
    private readonly registerEstablishmentUseCase: RegisterEstablishmentUseCase,
    private readonly findEstablishmentByIdUseCase: FindEstablishmentByIdUseCase, // Se inyectará aquí
  ) {}

  /**
   * Endpoint para registrar un nuevo establecimiento.
   *
   * @param registerDto Los datos del establecimiento a registrar.
   * @returns El DTO de respuesta del establecimiento creado.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED) // Código de estado HTTP 201 para creación exitosa
  // @ApiOperation({ summary: 'Registrar un nuevo establecimiento.' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'El establecimiento se ha creado correctamente.',
  //   type: EstablishmentResponseDto,
  // })
  // @ApiResponse({ status: 400, description: 'Invalid input data.' })
  // @ApiResponse({ status: 409, description: 'Educational center already exists.' })
  // @ApiResponse({ status: 500, description: 'Internal server error.' })
  async registerEstablishment(
    @Body() registerRequestDto: RegisterEstablishmentRequestDto, // Usamos un DTO de Request para validación
  ): Promise<EstablishmentResponseDto> {
    try {
      // 1. Convertir el DTO de Request (validado por la capa de presentación)
      // al DTO de la capa de Aplicación.
      const registerAppDto = new RegisterEstablishmentDto(registerRequestDto.name);

      // 2. Ejecutar el Caso de Uso (que contiene la orquestación de la lógica de negocio).
      const establishment = await this.registerEstablishmentUseCase.execute(registerAppDto);
        
      // 3. Mapear la entidad de dominio resultante a un DTO de respuesta para la API.
      return EstablishmentMapper.toResponseDto(establishment);
    } catch (error) {
      // *** TRADUCCIÓN DE EXCEPCIONES DE DOMINIO A EXCEPCIONES HTTP DE NESTJS ***
      if (error instanceof InvalidNameException) {
        throw new BadRequestException(error.message); // Mapea InvalidNameException a 400 Bad Request
      }

      if(error instanceof EstablishmentAlreadyExistsException){
        throw new ConflictException(error.message);
      }

      // Otros tipos de errores de dominio si existieran
      // if (error instanceof AnotherDomainException) { /* ... */ }
      // Si es un error desconocido o no esperado, relanzarlo o lanzar un InternalServerErrorException
      throw error; // Deja que el filtro global de excepciones lo maneje como 500
    }
  }

  /**
   * Endpoint para buscar un establecimiento por su ID.
   *
   * @param params El DTO que contiene el ID del establecimiento.
   * @returns El DTO de respuesta del establecimiento encontrado.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Buscar un establecimiento por su ID.' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The educational center found.',
  //   type: EstablishmentResponseDto,
  // })
  // @ApiResponse({ status: 404, description: 'Educational center not found.' })
  async findEstablishmentById(
    @Param() params: ParamIdDto,
  ): Promise<EstablishmentResponseDto> {
    try {
      // 1. El DTO de parámetro ya ha sido validado por la capa de presentación (ej. con class-validator).
    const centerId = BigInt(params.id); // Convertimos el string a BigInt para el dominio

    // 2. Ejecutar el Caso de Uso para encontrar el centro.
    const establishment =
      await this.findEstablishmentByIdUseCase.execute(centerId);

    if (!establishment) {
      // Lanzar una excepción de NestJS que se mapee a un 404
      throw new NotFoundException('establecimiento no encontrado.'); // O una excepción personalizada de NestJS
    }

    // 3. Mapear la entidad de dominio a un DTO de respuesta.
    return EstablishmentMapper.toResponseDto(establishment);
    } catch (error) {
      throw error; // Deja que el filtro global de excepciones lo maneje
    }
  }

  // Otros endpoints como PUT para actualización, DELETE para borrado, etc.
}
