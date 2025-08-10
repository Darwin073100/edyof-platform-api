import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { RegisterLotRequestDto } from "../dtos/register-lot-request.dto";
import { RegisterLotUseCase } from "../../application/use-case/register-lot.use-case";
import { LotMapper } from "../../application/mappers/lot.mapper";
import { LotAlreadyExistsException } from "../../domain/exceptions/lot-already-exists.exception";
import { LotValidateException } from "../../domain/exceptions/lot-validate.exception";
import { ProductNotFoundException } from "src/contexts/product-management/product/domain/exceptions/product-not-found.exception";

@Controller('/lots')
export class LotController {

    constructor(
        private readonly registerLotUseCase: RegisterLotUseCase,
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: RegisterLotRequestDto) {
        // Adaptar el DTO de request al DTO de aplicación
        try {
            const result = await this.registerLotUseCase.execute({
                initialQuantity: body.initialQuantity,
                purchaseUnit: body.purchaseUnit,
                lotNumber: body.lotNumber,
                productId: body.productId,
                purchasePrice: body.purchasePrice,
                receivedDate: body.receivedDate,
                expirationDate: body.expirationDate,
                manufacturingDate: body.manufacturingDate,
                lotUnitPurchases: body.lotUnitPurchases?.map(item => {
                    return {
                        // No pasar lotId aquí, se establecerá automáticamente por la relación
                        purchasePrice: item.purchasePrice,
                        purchaseQuantity: item.purchaseQuantity,
                        unit: item.unit,
                    };
                }) || null,
            });
            
            return LotMapper.toResponseDto(result);
        } catch (error) {
            if (error instanceof LotAlreadyExistsException) {
                throw new ConflictException(error.message);
            }

            if (error instanceof LotValidateException) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof ProductNotFoundException) {
                throw new NotFoundException(error.message);
            }

            throw error;
        }
    }
}