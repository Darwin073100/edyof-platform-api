import { CategoryMapper } from 'src/contexts/product-management/category/application/mappers/category-mapper';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductResponseDto } from '../dtos/product-response.dto';

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
      category: product.category? CategoryMapper.toResponseDto(product.category): null,
    };
  }
}
