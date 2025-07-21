import { ProductMapper } from "src/contexts/product-management/product/application/mappers/product.mapper";
import { InventoryItemEntity } from "../../domain/entities/inventory-item.entity";
import { InventoryResponseDto } from "../dtos/inventory-response.dto";
import { LotMapper } from "src/contexts/purchase-management/lot/application/mappers/lot.mapper";

export class InventoryItemMapper {
    static toResponseDto(entity: InventoryItemEntity): InventoryResponseDto {
        return new InventoryResponseDto(
            entity.inventoryItemId,
            entity.productId,
            entity.lotId,
            entity.branchOfficeId,
            entity.location,
            entity.quantityOnHand.value,
            entity.lastStockedAt,
            entity.isSellable,
            entity.purchasePriceAtStock.value,
            entity.createdAt,
            entity.internalBarCode?.value,
            entity.salePriceOne?.value,
            entity.salePriceMany?.value,
            entity.saleQuantityMany?.value,
            entity.salePriceSpecial?.value,
            entity.minStockBranch?.value,
            entity.maxStockBranch?.value,
            entity.updatedAt,
            entity.deletedAt,
            entity.product? ProductMapper.toResponseDto(entity.product) : null,
            entity.lot ? LotMapper.toResponseDto(entity.lot) : null
        );
    }
}
