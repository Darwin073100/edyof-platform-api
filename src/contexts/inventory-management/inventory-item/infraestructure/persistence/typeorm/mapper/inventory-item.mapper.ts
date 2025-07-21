import { InventoryItemEntity } from "src/contexts/inventory-management/inventory-item/domain/entities/inventory-item.entity";
import { InventoryItemOrmEntity } from "../entities/inventory-item.orm-entity";
import { InventoryItemQuantityOnHandVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-quantity-on-hand.vo";
import { InventoryItemPurchasePriceAtStockVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-purchase-price-at-stock.vo";
import { InventoryItemInternalBarCodeVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-internal-bar-code.vo";
import { InventoryItemSalePriceOneVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-sale-price-one.vo";
import { InventoryItemSalePriceManyVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-sale-price-many.vo";
import { InventoryItemMinStockBranchVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-min-stock-branch.vo";
import { InventoryItemMaxStockBranchVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-max-stock-branch.vo";
import { ProductTypeOrmMapper } from "src/contexts/product-management/product/infraestructure/persistence/typeorm/mappers/product.mapper";
import { LotMapper } from "src/contexts/purchase-management/lot/infraestructura/persistence/typeorm/mappers/lot.mapper";
import { BranchOfficeMapper } from "src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/mappers/branch-office.mapper";
import { InventoryItemSaleQuantityManyVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-sale-quantity-many.vo";
import { InventoryItemSalePriceSpecialVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-sale-price-special.vo";

export class InventoryItemMapper {
    static toDomain(ormEntity: InventoryItemOrmEntity){
        const domainEntity = InventoryItemEntity.reconstitute(
            ormEntity.inventoryItemId,
            ormEntity.productId,
            ormEntity.lotId,
            ormEntity.branchOfficeId,
            ormEntity.location,
            InventoryItemQuantityOnHandVO.create(ormEntity.quantityOnHan),
            ormEntity.lastStockedAt,
            ormEntity.isSellable,
            ormEntity.createdAt,
            InventoryItemPurchasePriceAtStockVO.create(ormEntity.purchasePriceAtStock),
            InventoryItemInternalBarCodeVO.create(ormEntity.internalBarCode),
            InventoryItemSalePriceOneVO.create(ormEntity.salePriceOne),
            InventoryItemSalePriceManyVO.create(ormEntity.salePriceMany),
            InventoryItemSaleQuantityManyVO.create(ormEntity.saleQuantityMany),
            InventoryItemSalePriceSpecialVO.create(ormEntity.salePriceSpecial),
            InventoryItemMinStockBranchVO.create(ormEntity.minStockBranch),
            InventoryItemMaxStockBranchVO.create(ormEntity.maxStockBranch),
            ormEntity.product? ProductTypeOrmMapper.toDomain(ormEntity.product): null,
            ormEntity.lot? LotMapper.toDomain(ormEntity.lot): null,
            ormEntity.branchOffice? BranchOfficeMapper.toDomainEntity(ormEntity.branchOffice): null,
            ormEntity.updatedAt,
            ormEntity.deletedAt
        );
        return domainEntity;
    }

    static toOrmEntity(domainEntity: InventoryItemEntity){
        const ormEntity = new InventoryItemOrmEntity();
        ormEntity.inventoryItemId = domainEntity.inventoryItemId;
        ormEntity.productId = domainEntity.productId;
        ormEntity.lotId = domainEntity.lotId;
        ormEntity.branchOfficeId = domainEntity.branchOfficeId;
        ormEntity.location = domainEntity.location;
        ormEntity.quantityOnHan = domainEntity.quantityOnHand.value;
        ormEntity.lastStockedAt = domainEntity.lastStockedAt;
        ormEntity.isSellable = domainEntity.isSellable;
        ormEntity.createdAt = domainEntity.createdAt;
        ormEntity.purchasePriceAtStock = domainEntity.purchasePriceAtStock.value;
        ormEntity.internalBarCode = domainEntity.internalBarCode?.value;
        ormEntity.salePriceOne = domainEntity.salePriceOne?.value;
        ormEntity.salePriceMany = domainEntity.salePriceMany?.value;
        ormEntity.saleQuantityMany = domainEntity.saleQuantityMany?.value;
        ormEntity.salePriceSpecial = domainEntity.salePriceSpecial?.value;
        ormEntity.minStockBranch = domainEntity.minStockBranch?.value;
        ormEntity.maxStockBranch = domainEntity.maxStockBranch?.value;
        ormEntity.product = domainEntity.product ? ProductTypeOrmMapper.toOrm(domainEntity.product): null;
        ormEntity.lot = domainEntity.lot? LotMapper.toOrm(domainEntity.lot): null;
        ormEntity.branchOffice = domainEntity.branchOffice? BranchOfficeMapper.toOrmEntity(domainEntity.branchOffice): null;
        ormEntity.updatedAt = domainEntity.updatedAt;
        ormEntity.deletedAt = domainEntity.deletedAt;

        return ormEntity;
    }
}