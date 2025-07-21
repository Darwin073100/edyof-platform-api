import { LotOrmEntity } from '../entities/lot.orm-entity';
import { LotEntity } from 'src/contexts/purchase-management/lot/domain/entities/lot.entity';
import { LotNumberVO } from 'src/contexts/purchase-management/lot/domain/value-objects/lot-number.vo';
import { PurchasePriceVO } from 'src/contexts/purchase-management/lot/domain/value-objects/purchase-price.vo';
import { InitialQuantityVO } from 'src/contexts/purchase-management/lot/domain/value-objects/initial-quantity.vo';
import { ExpirationDateVO } from 'src/contexts/purchase-management/lot/domain/value-objects/expiration-date.vo';
import { ManufacturingDateVO } from 'src/contexts/purchase-management/lot/domain/value-objects/manufacturing-date.vo';
import { ReceivedDateVO } from 'src/contexts/purchase-management/lot/domain/value-objects/received-date.vo';
import { ProductTypeOrmMapper } from 'src/contexts/product-management/product/infraestructure/persistence/typeorm/mappers/product.mapper';
import { InventoryItemMapper } from 'src/contexts/inventory-management/inventory-item/infraestructure/persistence/typeorm/mapper/inventory-item.mapper';

export class LotMapper {
  static toDomain(entity: LotOrmEntity): LotEntity {
    const product = entity.product ? ProductTypeOrmMapper.toDomain(entity?.product) : null;

    return LotEntity.reconstitute(
      entity.lotId,
      entity.productId,
      LotNumberVO.create(entity.lotNumber),
      PurchasePriceVO.create(Number(entity.purchasePrice)),
      InitialQuantityVO.create(Number(entity.initialQuantity)),
      ReceivedDateVO.create(entity.receivedDate),
      entity.createdAt,
      ExpirationDateVO.create(entity.expirationDate ?? null),
      ManufacturingDateVO.create(entity.manufacturingDate ?? null),
      entity.updatedAt ?? null,
      entity.deletedAt ?? null,
      product,
      entity.inventoryItems? entity.inventoryItems.map(item => InventoryItemMapper.toDomain(item)): null,
    );
  }

  static toOrm(domain: LotEntity): LotOrmEntity {
    const orm = new LotOrmEntity();
    orm.lotId = domain.lotId;
    orm.productId = domain.productId;
    orm.lotNumber = domain.lotNumber.value;
    orm.purchasePrice = domain.purchasePrice.value.toString();
    orm.initialQuantity = domain.initialQuantity.value.toString();
    orm.expirationDate = domain.expirationDate?.value ?? null;
    orm.manufacturingDate = domain.manufacturingDate?.value ?? null;
    orm.receivedDate = domain.receivedDate.value;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt ?? null;
    orm.deletedAt = domain.deletedAt ?? null;
    orm.product = domain.product ? ProductTypeOrmMapper.toOrm(domain.product) : null;
    orm.inventoryItems = domain.inventoryItems ? domain.inventoryItems.map(item => InventoryItemMapper.toOrmEntity(item)): undefined;
    return orm;
  }
}