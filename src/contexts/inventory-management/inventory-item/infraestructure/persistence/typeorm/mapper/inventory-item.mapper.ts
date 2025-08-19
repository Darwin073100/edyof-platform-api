import { InventoryItemOrmEntity } from "../entities/inventory-item.orm-entity";
import { InventoryItemQuantityOnHandVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-quantity-on-hand.vo";
import { InventoryItemPurchasePriceAtStockVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-purchase-price-at-stock.vo";
import { InventoryItemInternalBarCodeVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-internal-bar-code.vo";
import { InventoryMapper } from "src/contexts/inventory-management/inventory/infraestructure/persistence/typeorm/mapper/inventory.mapper";
import { InventoryItemEntity } from "src/contexts/inventory-management/inventory-item/domain/entities/inventory-item.entity";

export class InventoryItemMapper {
    static toDomain(ormEntity: InventoryItemOrmEntity){
        const domainEntity = InventoryItemEntity.reconstitute(
            ormEntity.inventoryItemId,
            ormEntity.inventoryId,
            ormEntity.location,
            InventoryItemQuantityOnHandVO.create(ormEntity.quantityOnHand),
            ormEntity.lastStockedAt,
            ormEntity.createdAt,
            InventoryItemPurchasePriceAtStockVO.create(ormEntity.purchasePriceAtStock),
            InventoryItemInternalBarCodeVO.create(ormEntity.internalBarCode),
            ormEntity.inventory ? InventoryMapper.toDomain(ormEntity.inventory) : null,
            ormEntity.updatedAt,
            ormEntity.deletedAt
        );
        return domainEntity;
    }

    static toOrmEntity(domainEntity: InventoryItemEntity){
        const ormEntity = new InventoryItemOrmEntity();
        ormEntity.inventoryItemId = domainEntity.inventoryId;
        ormEntity.inventoryId = domainEntity.inventoryId;
        ormEntity.location = domainEntity.location;
        ormEntity.quantityOnHand = domainEntity.quantityOnHand.value;
        ormEntity.lastStockedAt = domainEntity.lastStockedAt;
        ormEntity.createdAt = domainEntity.createdAt;
        ormEntity.purchasePriceAtStock = domainEntity.purchasePriceAtStock.value;
        ormEntity.internalBarCode = domainEntity.internalBarCode?.value;
        ormEntity.inventory = domainEntity.inventory? InventoryMapper.toOrmEntity(domainEntity.inventory): null;
        ormEntity.updatedAt = domainEntity.updatedAt;
        ormEntity.deletedAt = domainEntity.deletedAt;
        return ormEntity;
    }
}