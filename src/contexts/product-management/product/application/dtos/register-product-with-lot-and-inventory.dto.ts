import { LocationEnum } from "../../../../inventory-management/inventory-item/domain/enums/location.enum";

export class RegisterProductWhitLotAndInventoryDto {
    // InventoryItem
    branchOfficeId: bigint;
    location: LocationEnum;
    quantityOnHan: number;
    lastStockedAt: Date;
    isSellable: boolean;
    purchasePriceAtStock: number;
    internalBarCode?: string | null = null;
    salePriceOne?: number | null;
    salePriceMany?: number | null;
    saleQuantityMany?: number | null;
    salePriceSpecial?: number | null;
    minStockBranch?: number | null;
    maxStockBranch?: number | null;
    // Lot
    lotNumber: string;
    purchasePrice: number;
    initialQuantity: number;
    expirationDate?: Date | null;
    manufacturingDate?: Date | null;
    receivedDate: Date;
    // Product
    establishmentId: bigint;
    categoryId: bigint;
    brandId?: bigint | null = null;
    seasonId?: bigint | null;
    name: string;
    sku?: string | null;
    universalBarCode?: string | null;
    description?: string | null;
    unitOfMeasure: string;
    minStockGlobal: number;
    imageUrl?: string | null;
}