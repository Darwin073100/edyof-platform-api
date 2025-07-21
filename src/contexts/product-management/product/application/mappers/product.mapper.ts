import { CategoryMapper } from 'src/contexts/product-management/category/application/mappers/category-mapper';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { InventoryItemMapper } from 'src/contexts/inventory-management/inventory-item/application/mapper/inventory-item.mapper';
import { LotMapper } from 'src/contexts/purchase-management/lot/application/mappers/lot.mapper';
import { SeasonMapper } from 'src/contexts/product-management/season/application/mappers/season-mapper';
import { BrandMapper } from 'src/contexts/product-management/brand/application/mappers/brand.mapper';

export class ProductMapper {
  static toResponseDto(product: ProductEntity): ProductResponseDto {
    return {
      productId: product.productId,
      establishmentId: product.establishmentId,
      categoryId: product.categoryId,
      brandId: product.brandId,
      seasonId: product.seasonId,
      name: product.name.value,
      sku: product.sku.value ?? null,
      universalBarCode: product.universalBarCode.value ?? null,
      description: product.description.value ?? null,
      unitOfMeasure: product.unitOfMeasure,
      minStockGlobal: product.minStockGlobal,
      imageUrl: product.imageUrl ?? null,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt ?? null,
      deletedAt: product.deletedAt ?? null,
      season: product.season? SeasonMapper.toResponseDto(product.season): undefined,
      brand: product.brand? BrandMapper.toResponseDto(product.brand): undefined,
      category: product.category? CategoryMapper.toResponseDto(product.category): undefined,
      inventoryItems: product.inventories? product.inventories.map(item => InventoryItemMapper.toResponseDto(item)): undefined,
      lots: product.lots? product.lots.map(item=> LotMapper.toResponseDto(item)): undefined,
    };
  }

  static toResponseList(productList: ProductEntity[]){
    const result = productList.map(item => this.toResponseDto(item));
  }
}
