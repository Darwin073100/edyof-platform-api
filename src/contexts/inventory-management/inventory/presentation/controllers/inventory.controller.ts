import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { RegisterInventoryUseCase } from "../../application/use-case/register-inventory.use-case";
import { InventoryRequestDTO } from "../dtos/inventory-request.dto";
import { InventoryNotFoundException } from "../../domain/exceptions/inventory-not-found.exception";
import { InvalidInventoryException } from "../../domain/exceptions/invalid-inventory.exception";
import { InventoryMapper } from "../../application/mapper/inventory.mapper";
import { ViewAllInventoryUseCase } from "../../application/use-case/view-all-inventory.use-case";

@Controller('inventories')
export class InventoryController{
    constructor(
        private readonly registerInventoryUseCase: RegisterInventoryUseCase,
        private readonly viewAllInventoryUseCase: ViewAllInventoryUseCase, 
    ){}

    // Endpoint para registrar un nuevo item de inventario
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() inventoryRequestDto: InventoryRequestDTO) {
        try {
            const result = await this.registerInventoryUseCase.execute({
            productId: inventoryRequestDto.productId,
            lotId: inventoryRequestDto.lotId,
            branchOfficeId: inventoryRequestDto.branchOfficeId,
            salePriceOne: inventoryRequestDto.salePriceOne,
            salePriceMany: inventoryRequestDto.salePriceMany,
            saleQuantityMany: inventoryRequestDto.saleQuantityMany,
            salePriceSpecial: inventoryRequestDto.salePriceSpecial,
            minStockBranch: inventoryRequestDto.minStockBranch,
            maxStockBranch: inventoryRequestDto.maxStockBranch,
            isSellable: inventoryRequestDto.isSellable,
        });
        return InventoryMapper.toResponseDto(result);
        } catch (error) {
            if(error instanceof InvalidInventoryException){
                throw new BadRequestException(error.message);
            }

            if(error instanceof InventoryNotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }

    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async viewAllInventoryItem(){
        const result = await this.viewAllInventoryUseCase.execute();
        if(result.length === 0) return {inventoryItems:[]};
        const response = result.map(item => InventoryMapper.toResponseDto(item));
        return {
            inventoryItems: response
        }
    }
}