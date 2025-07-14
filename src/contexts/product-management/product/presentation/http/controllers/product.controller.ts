import { BadRequestException, Body, ConflictException, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { RegisterProductUseCase } from '../../../application/use-cases/register-product.use-case';
import { RegisterProductRequestDto } from '../dtos/register-product-request.dto';
import { ProductMapper } from '../../../application/mappers/product.mapper';
import { ProductAlreadyExistsException } from '../../../domain/exceptions/product-already-exists.exception';
import { ProductValidateException } from '../../../domain/exceptions/product-validate.exception';
import { ProductNotFoundException } from '../../../domain/exceptions/product-not-found.exception';
import { ViewAllProductsUseCase } from '../../../application/use-cases/view-all-products.use-case';

@Controller('products')
export class ProductController {
    constructor(
        private readonly registerProductUseCase: RegisterProductUseCase,
        private readonly viewAllProductsUseCase: ViewAllProductsUseCase,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: RegisterProductRequestDto) {
        // Adaptar el DTO de request al DTO de aplicación
        try {
            const result = await this.registerProductUseCase.execute({
                establishmentId: body.establishmentId,
                categoryId: body.categoryId,
                brandId: body.brandId ? body.brandId : null,
                seasonId: body.seasonId ? body.seasonId : null,
                name: body.name,
                sku: body.sku ?? null,
                universalBarCode: body.universalBarCode ?? null,
                description: body.description ?? null,
                unitOfMeasure: body.unitOfMeasure,
                minStockGlobal: body.minStockGlobal,
                imageUrl: body.imageUrl ?? null,
            });
            return ProductMapper.toResponseDto(result);
        } catch (error) {
            if (error instanceof ProductAlreadyExistsException) {
                throw new ConflictException(error.message);
            }

            if (error instanceof ProductValidateException) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof ProductNotFoundException) {
                throw new NotFoundException(error.message);
            }

            throw error;
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        try {
            const result = await this.viewAllProductsUseCase.execute();
            return {
                products: result.map(product => ProductMapper.toResponseDto(product))
            };
        } catch (error) {
            if (error instanceof ProductNotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
}
