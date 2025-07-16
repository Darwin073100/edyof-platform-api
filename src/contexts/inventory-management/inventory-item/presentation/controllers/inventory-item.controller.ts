import { BadRequestException, Body, Controller, HttpCode, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { RegisterInventoryItemUseCase } from "../../application/use-case/register-inventory-item.use-case";
import { InventoryItemDTO } from "../dtos/inventory-item-request.dto";
import { InventoryItemNotFoundException } from "../../domain/exceptions/inventory-item-not-found.exception";
import { InvalidInventoryItemException } from "../../domain/exceptions/invalid-inventory-item.exception";
import { InventoryItemMapper } from "../../application/mapper/inventory-item.mapper";

@Controller('inventory-items')
export class InventoryItemController{
    constructor(
        private readonly registerInventoryItemUseCase: RegisterInventoryItemUseCase,
    ){}

    // Endpoint para registrar un nuevo item de inventario
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() inventoryItemDto: InventoryItemDTO) {
        try {
            const result = await this.registerInventoryItemUseCase.execute({
            productId: inventoryItemDto.productId,
            lotId: inventoryItemDto.lotId,
            branchOfficeId: inventoryItemDto.branchOfficeId,
            location: inventoryItemDto.location,
            quantityOnHan: inventoryItemDto.quantityOnHand,
            purchasePriceAtStock: inventoryItemDto.purchasePriceAtStock,
            internalBarCode: inventoryItemDto.internalBarCode,
            salePriceOne: inventoryItemDto.salePriceOne,
            salePriceMany: inventoryItemDto.salePriceMany,
            minStockBranch: inventoryItemDto.minStockBranch,
            maxStockBranch: inventoryItemDto.maxStockBranch,
            lastStockedAt: inventoryItemDto.lastStockedAt ? new Date(inventoryItemDto.lastStockedAt) : new Date(),
            isSellable: inventoryItemDto.isSellable,
        });
        return InventoryItemMapper.toResponseDto(result);
        } catch (error) {
            if(error instanceof InvalidInventoryItemException){
                throw new BadRequestException(error.message);
            }

            if(error instanceof InventoryItemNotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }

    }
}