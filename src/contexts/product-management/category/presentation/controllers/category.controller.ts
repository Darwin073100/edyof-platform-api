import { BadRequestException, Body, ConflictException, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterCategoryUseCase } from "../../application/use-cases/register-category.use-case";
import { RegisterCategoryDto } from "../../application/dtos/register-category.dto";
import { RegisterCategoryRequestDto } from "../dtos/register-category-request.dto";
import { CategoryMapper } from "../../application/mappers/category-mapper";
import { InvalidCategoryException } from "../../domain/exceptions/invalid-category.exception";
import { CategoryAlreadyExistsException } from "../../domain/exceptions/category-already-exists.exception";
import { ViewAllCategoriesUseCase } from "../../application/use-cases/view-all-categories.use-case";

@Controller('categories')
export class CategoryController{
    constructor(
        private readonly registerCategoryUseCase: RegisterCategoryUseCase,
        private readonly viewAllCategoriesUseCase: ViewAllCategoriesUseCase,
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

      if( error instanceof CategoryAlreadyExistsException){
        throw new ConflictException(error.message);
      }
      // Si es un error desconocido o no esperado, relanzarlo o lanzar un InternalServerErrorException
      throw error; // Deja que el filtro global de excepciones lo maneje como 500
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async viewAllCategories(){
        try {
            const result = await this.viewAllCategoriesUseCase.execute();
            return {
                categories: result.map(item => CategoryMapper.toResponseDto(item))
            }
        } catch (error) {
            throw error;
        }
    }
}