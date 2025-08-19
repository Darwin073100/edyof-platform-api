import { InventoryResponseDto } from "src/contexts/inventory-management/inventory/application/dtos/inventory-response.dto";
import { ProductResponseDto } from "src/contexts/product-management/product/application/dtos/product-response.dto";
import { LotUnitPurchaseResponseDTO } from "./lot-unit-purchase-response.dto";
import { ForSaleEnum } from "src/shared/domain/enums/for-sale.enum";

export class LotResponseDto {
  lotId: bigint;
  productId: bigint;
  lotNumber: string;
  purchasePrice: number;
  purchaseUnit: ForSaleEnum;
  initialQuantity: number;
  expirationDate?: Date | null;
  manufacturingDate?: Date | null;
  product?: ProductResponseDto | null;
  inventories?: InventoryResponseDto[] | null;
  lotUnitPurchases?: LotUnitPurchaseResponseDTO[] | null;
  receivedDate: Date;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
