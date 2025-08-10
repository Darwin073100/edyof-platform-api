import { ProductMapper } from 'src/contexts/product-management/product/application/mappers/product.mapper';
import { LotEntity } from '../../domain/entities/lot.entity';
import { LotResponseDto } from '../dtos/lot-response.dto';
import { InventoryItemMapper } from 'src/contexts/inventory-management/inventory-item/application/mapper/inventory-item.mapper';
import { LotUnitPurchaseMapper } from './lot-unit-purchase.mapper';

export class LotMapper {
  static toResponseDto(lot: LotEntity): LotResponseDto {
    return {
      lotId: lot.lotId,
      productId: lot.productId,
      lotNumber: lot.lotNumber.value,
      purchasePrice: lot.purchasePrice.value,
      initialQuantity: lot.initialQuantity.value,
      expirationDate: lot.expirationDate?.value ?? null,
      manufacturingDate: lot.manufacturingDate?.value ?? null,
      receivedDate: lot.receivedDate.value,
      product: lot.product? ProductMapper.toResponseDto(lot.product): undefined,
      inventoryItems: lot.inventoryItems? lot.inventoryItems.map(item=> InventoryItemMapper.toResponseDto(item)): undefined,
      lotUnitPurchases: lot.lotUnitPurchases ? lot.lotUnitPurchases.map(item => LotUnitPurchaseMapper.toResponseDTO(item)) : undefined,
      createdAt: lot.createdAt,
      updatedAt: lot.updatedAt ?? null,
      deletedAt: lot.deletedAt ?? null,
    };
  }
}
