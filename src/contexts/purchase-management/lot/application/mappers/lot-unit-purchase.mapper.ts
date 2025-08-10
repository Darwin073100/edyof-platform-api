import { LotUnitPurchaseEntity } from "../../domain/entities/lot-unit-purchase.entity";
import { LotUnitPurchaseResponseDTO } from "../dtos/lot-unit-purchase-response.dto";

export class LotUnitPurchaseMapper{
    static toResponseDTO(domainEntity: LotUnitPurchaseEntity): LotUnitPurchaseResponseDTO {
        const dto = new LotUnitPurchaseResponseDTO();
        dto.lotUnitPurchaseId = domainEntity.lotUnitPurchaseId;
        dto.lotId = domainEntity.lotId?? BigInt(0);
        dto.purchasePrice = domainEntity.purchasePrice.value;
        dto.purchaseQuantity = domainEntity.purchaseQuantity.value;
        dto.unit = domainEntity.unit;
        dto.createdAt = domainEntity.createdAt;
        dto.updatedAt = domainEntity.updatedAt;
        dto.deletedAt = domainEntity.deletedAt;
        return dto;
    }
}