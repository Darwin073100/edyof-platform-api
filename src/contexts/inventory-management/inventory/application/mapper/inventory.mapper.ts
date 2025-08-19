import { ProductMapper } from "src/contexts/product-management/product/application/mappers/product.mapper";
import { InventoryEntity } from "../../domain/entities/inventory.entity";
import { InventoryResponseDto } from "../dtos/inventory-response.dto";
import { LotMapper } from "src/contexts/purchase-management/lot/application/mappers/lot.mapper";
import { InventoryItemMapper } from "src/contexts/inventory-management/inventory-item/application/mapper/inventory-item.mapper";

export class InventoryMapper {
    static toResponseDto(entity: InventoryEntity): InventoryResponseDto {
        return new InventoryResponseDto(
            entity.inventoryId,
            entity.productId,
            entity.lotId,
            entity.branchOfficeId,
            entity.isSellable,
            entity.createdAt,
            entity.salePriceOne?.value,
            entity.salePriceMany?.value,
            entity.saleQuantityMany?.value,
            entity.salePriceSpecial?.value,
            entity.minStockBranch?.value,
            entity.maxStockBranch?.value,
            entity.updatedAt,
            entity.deletedAt,
            entity.product? ProductMapper.toResponseDto(entity.product) : null,
            entity.lot ? LotMapper.toResponseDto(entity.lot) : null,
            entity.inventoryItems ? entity.inventoryItems?.map(item => InventoryItemMapper.toResponseDto(item)): null,
        );
    }
}
