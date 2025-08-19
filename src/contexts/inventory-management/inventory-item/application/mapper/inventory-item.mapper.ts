import { InventoryItemEntity } from "../../domain/entities/inventory-item.entity";
import { InventoryItemResponseDto } from "../dtos/inventory-item-response.dto";
import { InventoryMapper } from "src/contexts/inventory-management/inventory/application/mapper/inventory.mapper";

export class InventoryItemMapper {
    static toResponseDto(entity: InventoryItemEntity): InventoryItemResponseDto {
        return new InventoryItemResponseDto(
            entity.inventoryItemId,
            entity.inventoryId,
            entity.location,
            entity.quantityOnHand.value,
            entity.lastStockedAt,
            entity.purchasePriceAtStock.value,
            entity.createdAt,
            entity.internalBarCode?.value,
            entity.updatedAt,
            entity.deletedAt,
            entity.inventory? InventoryMapper.toResponseDto(entity.inventory) : null,
        );
    }
}
