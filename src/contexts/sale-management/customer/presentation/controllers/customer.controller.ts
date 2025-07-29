import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { RegisterCustomerUseCase } from "../../application/use-cases/register-customer.use-case";
import { RegisterCustomerRequestDto } from "../dtos/register-customer-request.dto";
import { CustomerResponseDto } from "../../application/dtos/customer-response.dto";
import { RegisterCustomerDto } from "../../application/dtos/register-customer.dto";
import { CustomerMapper } from "../../application/mappers/suplier.mapper";import { InvalidCustomerException } from "../../domain/exceptions/invalid-customer.exception";
import { InvalidAddressException } from "../../../../../shared/domain/exceptions/invalid-address.exception";import { CustomerAlreadyExistsException } from "../../domain/exceptions/customer-already-exists.exception";


@Controller('customers')
export class CustomerController{
    constructor(
        private readonly registerCustomerUseCase: RegisterCustomerUseCase,
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async registerSuplier(
        @Body() registerRequestDto: RegisterCustomerRequestDto, // Usamos un DTO de Request para validación
      ): Promise<CustomerResponseDto> {
        try {
          // 1. Convertir el DTO de Request (validado por la capa de presentación)
          // al DTO de la capa de Aplicación.
          const registerAppDto = new RegisterCustomerDto(
            registerRequestDto.firstName,
            registerRequestDto.lastName,
            registerRequestDto.companyName,
            registerRequestDto.phoneNumber,
            registerRequestDto.address? {
                street: registerRequestDto.address.street,
                externalNumber: registerRequestDto.address.externalNumber,
                internalNumber: registerRequestDto.address.internalNumber,
                municipality: registerRequestDto.address.municipality,
                neighborhood: registerRequestDto.address.neighborhood,
                city: registerRequestDto.address.city,
                state: registerRequestDto.address.state,
                postalCode: registerRequestDto.address.postalCode,
                country: registerRequestDto.address.country,
                reference: registerRequestDto.address.reference,
            }: undefined,
            registerRequestDto.rfc,
            registerRequestDto.email,
            registerRequestDto.customerType
        );
          // ...removed commented console.log...
    
          // 2. Ejecutar el Caso de Uso (que contiene la orquestación de la lógica de negocio).
          const customer = await this.registerCustomerUseCase.execute(registerAppDto);

          // 3. Mapear la entidad de dominio resultante a un DTO de respuesta para la API.
          return CustomerMapper.toResponseDto(customer);
        } catch (error) {
          
          // *** TRADUCCIÓN DE EXCEPCIONES DE DOMINIO A EXCEPCIONES HTTP DE NESTJS ***
          if ((error instanceof InvalidCustomerException) || (error instanceof InvalidAddressException) ) {
            throw new BadRequestException(error.message); // Mapea InvalidNameException a 400 Bad Request
          }

          if(error instanceof CustomerAlreadyExistsException){
            throw new ConflictException(error.message);
          }
    
          // Otros tipos de errores de dominio si existieran
          // if (error instanceof AnotherDomainException) { /* ... */ }
          // Si es un error desconocido o no esperado, relanzarlo o lanzar un InternalServerErrorException
          throw error; // Deja que el filtro global de excepciones lo maneje como 500
        }
      }
}