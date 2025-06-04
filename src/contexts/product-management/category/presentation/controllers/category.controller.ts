import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterCategoryUseCase } from "../../application/use-cases/register-category.use-case";
import { RegisterCategoryDto } from "../../application/dtos/register-category.dto";
import { RegisterCategoryRequestDto } from "../dtos/register-category-request.dto";
import { CategoryMapper } from "../../application/mappers/category-mapper";
import { InvalidCategoryException } from "../../domain/exceptions/invalid-category.exception";

@Controller('categories')
export class CategoryController{
    constructor(
        private readonly registerCategoryUseCase: RegisterCategoryUseCase,
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED) // Código de estado HTTP 201 para creación exitosa
    async registerCategory(
        @Body()
        registerRequestDto: RegisterCategoryRequestDto
    ){
        try {
            const registerAppDto = new RegisterCategoryDto(
                registerRequestDto.name, 
                registerRequestDto.description
            );

            const category = await this.registerCategoryUseCase.execute(registerAppDto);
            return CategoryMapper.toResponseDto(category);
        } catch (error) {
            // *** TRADUCCIÓN DE EXCEPCIONES DE DOMINIO A EXCEPCIONES HTTP DE NESTJS ***
      if (error instanceof InvalidCategoryException) {
        throw new BadRequestException(error.message); // Mapea InvalidNameException a 400 Bad Request
      }

      // Codigo de error que lanza typeorm cuando ya existe un centro educativo con el mismo nombre
      if(error?.code === '23505')
        throw new ConflictException('Ya existe una categoria con ese nombre.'); // Mapea errores de conflicto de la base de datos (ej. duplicados) a 409 Conflict
      // Otros tipos de errores de dominio si existieran
      // if (error instanceof AnotherDomainException) { /* ... */ }
      // Si es un error desconocido o no esperado, relanzarlo o lanzar un InternalServerErrorException
      throw error; // Deja que el filtro global de excepciones lo maneje como 500
        }
    }
}