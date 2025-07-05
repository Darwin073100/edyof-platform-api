import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { RegisterSuplierUseCase } from "../../application/use-cases/register-suplier.use-case";
import { RegisterSuplierRequestDto } from "../dtos/register-suplier-request.dto";
import { SuplierResponseDto } from "../../application/dtos/suplier-response.dto";
import { RegisterSuplierDto } from "../../application/dtos/register-suplier.dto";
import { SuplierMapper } from "../../application/mappers/suplier.mapper";import { InvalidSuplierException } from "../../domain/exceptions/invalid-suplier.exception";
import { InvalidAddressException } from "../../../../../shared/domain/exceptions/invalid-address.exception";import { SuplierAlreadyExistsException } from "../../domain/exceptions/suplier-already-exists.exception";

/**
 * SuplierController es el controlador de NestJS que maneja las solicitudes HTTP
 * relacionadas con la gestión de proveedores.
 *
 * Es parte de la capa de Presentación y actúa como un Adaptador que convierte
 * solicitudes HTTP en llamadas a Casos de Uso de la capa de Aplicación.
 */
@Controller('supliers')
export class SuplierController{
    constructor(
        private readonly registerSupliersUseCase: RegisterSuplierUseCase,
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async registerSuplier(
        @Body() registerRequestDto: RegisterSuplierRequestDto, // Usamos un DTO de Request para validación
      ): Promise<SuplierResponseDto> {
        try {
          // 1. Convertir el DTO de Request (validado por la capa de presentación)
          // al DTO de la capa de Aplicación.
          const registerAppDto = new RegisterSuplierDto(
            registerRequestDto.name,
            registerRequestDto.phoneNumber,
            {
                street: registerRequestDto.street,
                externalNumber: registerRequestDto.externalNumber,
                internalNumber: registerRequestDto.internalNumber,
                municipality: registerRequestDto.municipality,
                neighborhood: registerRequestDto.neighborhood,
                city: registerRequestDto.city,
                state: registerRequestDto.state,
                postalCode: registerRequestDto.postalCode,
                country: registerRequestDto.country,
                reference: registerRequestDto.reference,
            },
            registerRequestDto.rfc,
            registerRequestDto.contactPerson,
            registerRequestDto.email,
            registerRequestDto.notes
        );
          // console.log(registerRequestDto);
    
          // 2. Ejecutar el Caso de Uso (que contiene la orquestación de la lógica de negocio).
          const suplier = await this.registerSupliersUseCase.execute(registerAppDto);
            
          // 3. Mapear la entidad de dominio resultante a un DTO de respuesta para la API.
          return SuplierMapper.toResponseDto(suplier);
        } catch (error) {
          
          // *** TRADUCCIÓN DE EXCEPCIONES DE DOMINIO A EXCEPCIONES HTTP DE NESTJS ***
          if ((error instanceof InvalidSuplierException) || (error instanceof InvalidAddressException) ) {
            throw new BadRequestException(error.message); // Mapea InvalidNameException a 400 Bad Request
          }

          if(error instanceof SuplierAlreadyExistsException){
            throw new ConflictException(error.message);
          }
    
          // Otros tipos de errores de dominio si existieran
          // if (error instanceof AnotherDomainException) { /* ... */ }
          // Si es un error desconocido o no esperado, relanzarlo o lanzar un InternalServerErrorException
          throw error; // Deja que el filtro global de excepciones lo maneje como 500
        }
      }
}