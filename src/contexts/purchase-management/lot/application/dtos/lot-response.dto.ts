import { ProductResponseDto } from "src/contexts/product-management/product/application/dtos/product-response.dto";

export class LotResponseDto {
  lotId: bigint;
  productId: bigint;
  lotNumber: string;
  purchasePrice: number;
  initialQuantity: number;
  expirationDate?: Date | null;
  manufacturingDate?: Date | null;
  product?: ProductResponseDto | null;
  receivedDate: Date;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
