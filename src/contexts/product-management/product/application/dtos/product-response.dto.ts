import { CategoryResponseDto } from "src/contexts/product-management/category/application/dtos/category-response.dto";

export class ProductResponseDto {
  productId: bigint;
  establishmentId: bigint;
  categoryId: bigint;
  brandId: bigint | null;
  seasonId: bigint | null;
  name: string;
  sku: string | null;
  universalBarCode: string | null;
  description: string | null;
  unitOfMeasure: string;
  minStockGlobal: number;
  imageUrl: string | null;
  category?: CategoryResponseDto | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
