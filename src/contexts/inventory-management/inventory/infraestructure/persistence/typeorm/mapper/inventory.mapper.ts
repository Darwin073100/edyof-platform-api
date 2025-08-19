import { InventoryEntity } from "src/contexts/inventory-management/inventory/domain/entities/inventory.entity";
import { InventoryOrmEntity } from "../entities/inventory.orm-entity";
import { InventorySalePriceOneVO } from "src/contexts/inventory-management/inventory/domain/value-objects/inventory-sale-price-one.vo";
import { InventorySalePriceManyVO } from "src/contexts/inventory-management/inventory/domain/value-objects/inventory-sale-price-many.vo";
import { InventoryMinStockBranchVO } from "src/contexts/inventory-management/inventory/domain/value-objects/inventory-min-stock-branch.vo";
import { InventoryMaxStockBranchVO } from "src/contexts/inventory-management/inventory/domain/value-objects/inventory-max-stock-branch.vo";
import { ProductTypeOrmMapper } from "src/contexts/product-management/product/infraestructure/persistence/typeorm/mappers/product.mapper";
import { LotMapper } from "src/contexts/purchase-management/lot/infraestructura/persistence/typeorm/mappers/lot.mapper";
import { BranchOfficeMapper } from "src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/mappers/branch-office.mapper";
import { InventorySaleQuantityManyVO } from "src/contexts/inventory-management/inventory/domain/value-objects/inventory-sale-quantity-many.vo";
import { InventorySalePriceSpecialVO } from "src/contexts/inventory-management/inventory/domain/value-objects/inventory-sale-price-special.vo";
import { InventoryItemMapper } from "src/contexts/inventory-management/inventory-item/infraestructure/persistence/typeorm/mapper/inventory-item.mapper";

export class InventoryMapper {
    static toDomain(ormEntity: InventoryOrmEntity){
        const domainEntity = InventoryEntity.reconstitute(
            ormEntity.inventoryId,
            ormEntity.productId,
            ormEntity.lotId,
            ormEntity.branchOfficeId,
            ormEntity.isSellable,
            ormEntity.createdAt,
            InventorySalePriceOneVO.create(ormEntity.salePriceOne),
            InventorySalePriceManyVO.create(ormEntity.salePriceMany),
            InventorySaleQuantityManyVO.create(ormEntity.saleQuantityMany),
            InventorySalePriceSpecialVO.create(ormEntity.salePriceSpecial),
            InventoryMinStockBranchVO.create(ormEntity.minStockBranch),
            InventoryMaxStockBranchVO.create(ormEntity.maxStockBranch),
            ormEntity.product? ProductTypeOrmMapper.toDomain(ormEntity.product): null,
            ormEntity.lot? LotMapper.toDomain(ormEntity.lot): null,
            ormEntity.branchOffice? BranchOfficeMapper.toDomainEntity(ormEntity.branchOffice): null,
            ormEntity.inventoryItems? ormEntity.inventoryItems.map(item => InventoryItemMapper.toDomain(item)): null,
            ormEntity.updatedAt,
            ormEntity.deletedAt
        );
        return domainEntity;
    }

    static toOrmEntity(domainEntity: InventoryEntity){
        const ormEntity = new InventoryOrmEntity();
        ormEntity.inventoryId = domainEntity.inventoryId;
        ormEntity.productId = domainEntity.productId;
        ormEntity.lotId = domainEntity.lotId;
        ormEntity.branchOfficeId = domainEntity.branchOfficeId;
        ormEntity.isSellable = domainEntity.isSellable;
        ormEntity.createdAt = domainEntity.createdAt;
        ormEntity.salePriceOne = domainEntity.salePriceOne?.value;
        ormEntity.salePriceMany = domainEntity.salePriceMany?.value;
        ormEntity.saleQuantityMany = domainEntity.saleQuantityMany?.value;
        ormEntity.salePriceSpecial = domainEntity.salePriceSpecial?.value;
        ormEntity.minStockBranch = domainEntity.minStockBranch?.value;
        ormEntity.maxStockBranch = domainEntity.maxStockBranch?.value;
        ormEntity.product = domainEntity.product ? ProductTypeOrmMapper.toOrm(domainEntity.product): null;
        ormEntity.lot = domainEntity.lot? LotMapper.toOrm(domainEntity.lot): null;
        ormEntity.branchOffice = domainEntity.branchOffice? BranchOfficeMapper.toOrmEntity(domainEntity.branchOffice): null;
        ormEntity.inventoryItems = domainEntity.inventoryItems? domainEntity.inventoryItems.map(item=> InventoryItemMapper.toOrmEntity(item)): undefined;
        ormEntity.updatedAt = domainEntity.updatedAt;
        ormEntity.deletedAt = domainEntity.deletedAt;

        return ormEntity;
    }
}