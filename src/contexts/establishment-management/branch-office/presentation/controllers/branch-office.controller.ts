import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { RegisterBranchOfficeUseCase } from "../../application/use-cases/register-branch-office.use-case";
import { RegisterBranchOfficeRequestDto } from "../dtos/register-branch-office-request.dto";
import { BranchOfficeResponseDto } from "../../application/dtos/branch-office-response.dto";
import { RegisterBranchOfficeDto } from "../../application/dtos/register-branch-office.dto";
import { BranchOfficeMapper } from "../../application/mappers/branch-office.mapper";
import { InvalidNameException } from "src/contexts/establishment-management/establishment/domain/exceptions/invalid-name.exception";
import { InvalidBranchOfficeException } from "../../domain/exceptions/invalid-branch-office.exception";
import { InvalidAddressException } from "../../../../../shared/domain/exceptions/invalid-address.exception";
import { EstablishmentNotFoundException } from "src/contexts/establishment-management/establishment/domain/exceptions/establishment-not-found.exception";

/**
 * BranchOfficeController es el controlador de NestJS que maneja las solicitudes HTTP
 * relacionadas con la gestión de sucursales.
 *
 * Es parte de la capa de Presentación y actúa como un Adaptador que convierte
 * solicitudes HTTP en llamadas a Casos de Uso de la capa de Aplicación.
 */
@Controller('branch-offices')
export class BranchOfficeController{
    constructor(
        private readonly registerBranchOfficeUseCase: RegisterBranchOfficeUseCase,
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async registerBranchOffice(
        @Body() registerRequestDto: RegisterBranchOfficeRequestDto, // Usamos un DTO de Request para validación
      ): Promise<BranchOfficeResponseDto> {
        try {
          // 1. Convertir el DTO de Request (validado por la capa de presentación)
          // al DTO de la capa de Aplicación.
          const registerAppDto = new RegisterBranchOfficeDto(
            registerRequestDto.name,
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
            registerRequestDto.establishmentId,
        );
          // console.log(registerRequestDto);
    
          // 2. Ejecutar el Caso de Uso (que contiene la orquestación de la lógica de negocio).
          const branchOffice = await this.registerBranchOfficeUseCase.execute(registerAppDto);
            
          // 3. Mapear la entidad de dominio resultante a un DTO de respuesta para la API.
          return BranchOfficeMapper.toResponseDto(branchOffice);
        } catch (error) {
          
          // *** TRADUCCIÓN DE EXCEPCIONES DE DOMINIO A EXCEPCIONES HTTP DE NESTJS ***
          if ((error instanceof InvalidBranchOfficeException) || (error instanceof InvalidAddressException) ) {
            throw new BadRequestException(error.message); // Mapea InvalidNameException a 400 Bad Request
          }

          if(error instanceof EstablishmentNotFoundException){
            throw new NotFoundException(error.message);
          }
    
          // Otros tipos de errores de dominio si existieran
          // if (error instanceof AnotherDomainException) { /* ... */ }
          // Si es un error desconocido o no esperado, relanzarlo o lanzar un InternalServerErrorException
          throw error; // Deja que el filtro global de excepciones lo maneje como 500
        }
      }
}