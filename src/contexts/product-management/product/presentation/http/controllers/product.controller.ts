import { BadRequestException, Body, ConflictException, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RegisterProductUseCase } from '../../../application/use-cases/register-product.use-case';
import { RegisterProductRequestDto } from '../dtos/register-product-request.dto';
import { ProductMapper } from '../../../application/mappers/product.mapper';
import { ProductAlreadyExistsException } from '../../../domain/exceptions/product-already-exists.exception';
import { ProductValidateException } from '../../../domain/exceptions/product-validate.exception';
import { ProductNotFoundException } from '../../../domain/exceptions/product-not-found.exception';
import { ViewAllProductsUseCase } from '../../../application/use-cases/view-all-products.use-case';
import { RegisterProductWithLotAndInventoryItemRequestDto } from '../dtos/register-product-with-lot-and-inventory-item-request.dto';
import { RegisterProductWithLotAndInventoryItemUseCase } from '../../../application/use-cases/register-product-with-lot-and-inventory-item.use-case';
import { ViewProductByIdUseCase } from '../../../application/use-cases/view-product-by-id.use-case';
import { InventoryItemRegisterDto } from 'src/contexts/inventory-management/inventory-item/application/dtos/inventory-item-register.dto';

@Controller('products')
export class ProductController {
    constructor(
        private readonly registerProductUseCase: RegisterProductUseCase,
        private readonly viewAllProductsUseCase: ViewAllProductsUseCase,
        private readonly viewProductByIdUseCase: ViewProductByIdUseCase,
        private readonly registerProductWithLotAndInventoryItemUseCase: RegisterProductWithLotAndInventoryItemUseCase
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
    @Post('with-lot-and-inventory-item')
    @HttpCode(HttpStatus.CREATED)
    async registerProductWithLotAndInventoryItem(@Body() body: RegisterProductWithLotAndInventoryItemRequestDto) {
        // Adaptar el DTO de request al DTO de aplicación
        try {
            const result = await this.registerProductWithLotAndInventoryItemUseCase.execute({
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
                initialQuantity: body.initialQuantity,
                purchaseUnit: body.purchaseUnit,
                lotNumber: body.lotNumber,
                purchasePrice: body.purchasePrice,
                receivedDate: body.receivedDate,
                expirationDate: body.expirationDate,
                manufacturingDate: body.manufacturingDate,
                branchOfficeId: body.branchOfficeId,
                salePriceOne: body.salePriceOne,
                salePriceMany: body.salePriceMany,
                saleQuantityMany: body.saleQuantityMany,
                salePriceSpecial: body.salePriceSpecial,
                minStockBranch: body.minStockBranch,
                maxStockBranch: body.maxStockBranch,
                inventoryItems: body.inventoryItems?.map(item => {
                     const h: InventoryItemRegisterDto = {
                        inventoryId: BigInt(new Date().getTime()),
                        lastStockedAt: item.lastStockedAt ?new Date(item.lastStockedAt): new Date(),
                        location: item.location,
                        purchasePriceAtStock: item.purchasePriceAtStock,
                        quantityOnHan: item.quantityOnHand,
                        internalBarCode: item.internalBarCode
                    }
                    return h;
                }),
                isSellable: body.isSellable,
                lotUnitPurchases: body.lotUnitPurchases
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
            // ...removed console.log...

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

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: bigint) {
        try {
            const result = await this.viewProductByIdUseCase.execute(id);
            if (!result) {
                throw new ProductNotFoundException('El producto que buscas no existe');
            }
            return ProductMapper.toResponseDto(result);
        } catch (error) {
            if (error instanceof ProductNotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
}
