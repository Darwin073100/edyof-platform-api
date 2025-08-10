import { ProductCheckerPort } from "src/contexts/product-management/product/domain/ports/out/product-checker.port";
import { LotEntity } from "../../domain/entities/lot.entity";
import { LotRepository } from "../../domain/repositories/lot.repository";
import { ExpirationDateVO } from "../../domain/value-objects/expiration-date.vo";
import { InitialQuantityVO } from "../../domain/value-objects/initial-quantity.vo";
import { LotNumberVO } from "../../domain/value-objects/lot-number.vo";
import { ManufacturingDateVO } from "../../domain/value-objects/manufacturing-date.vo";
import { PurchasePriceVO } from "../../domain/value-objects/purchase-price.vo";
import { ReceivedDateVO } from "../../domain/value-objects/received-date.vo";
import { RegisterLotDto } from "../dtos/register-lot.dto";
import { ProductNotFoundException } from "src/contexts/product-management/product/domain/exceptions/product-not-found.exception";
import { LotUnitPurchaseEntity } from "../../domain/entities/lot-unit-purchase.entity";
import { LotPurchaseQuantityVO } from "../../domain/value-objects/lot-purchase-quantity.vo";

export class RegisterLotUseCase {
    constructor(
        private readonly lotRepository: LotRepository,
        private readonly productCheckerPort: ProductCheckerPort,
    ) { }

    async execute(dto: RegisterLotDto): Promise<LotEntity> {
        // Validar que el producto existe
        const productExists = await this.productCheckerPort.check(dto.productId);

        if (!productExists) {
            throw new ProductNotFoundException(`El producto con ID ${dto.productId} no existe.`);
        }

        const lot = LotEntity.reconstitute(
            BigInt(new Date().getDate()),
            dto.productId,
            LotNumberVO.create(dto.lotNumber),
            PurchasePriceVO.create(dto.purchasePrice),
            InitialQuantityVO.create(dto.initialQuantity),
            dto.purchaseUnit,
            ReceivedDateVO.create(dto.receivedDate),
            new Date(),
            ExpirationDateVO.create(dto.expirationDate),
            ManufacturingDateVO.create(dto.manufacturingDate),
            null,
            null,
            null,
            null,
            dto.lotUnitPurchases?.map(item => {
                return LotUnitPurchaseEntity.create(
                    BigInt(new Date().getTime()),
                    PurchasePriceVO.create(item.purchasePrice),
                    LotPurchaseQuantityVO.create(item.purchaseQuantity),
                    item.unit
                )
            })
        );


        const result = await this.lotRepository.save(lot);

        return result;
    }
}