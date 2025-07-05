import { ProductEntity } from '../entities/product.entity';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductRepository {
  findByEstablishmentAndSku(establishmentId: bigint, sku: string): Promise<ProductEntity | null>;
  findByEstablishmentAndUniversalBarCode(establishmentId: bigint, barCode: string): Promise<ProductEntity | null>;
  save(product: ProductEntity): Promise<ProductEntity>;
  // ...otros métodos necesarios
}
