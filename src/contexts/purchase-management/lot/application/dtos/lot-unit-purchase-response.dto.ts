import { ForSaleEnum } from "src/shared/domain/enums/for-sale.enum";

export class LotUnitPurchaseResponseDTO{
    lotUnitPurchaseId: bigint
    lotId: bigint;
    purchasePrice: number;
    purchaseQuantity: number;
    unit: ForSaleEnum;
    unitsInPurchaseUnit: number;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}