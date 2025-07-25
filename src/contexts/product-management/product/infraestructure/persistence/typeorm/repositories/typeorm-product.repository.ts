import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryFailedError, Repository } from 'typeorm';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { ProductTypeOrmMapper } from '../mappers/product.mapper';
import { ProductRepository } from 'src/contexts/product-management/product/domain/repositories/product.repository';
import { ProductEntity } from 'src/contexts/product-management/product/domain/entities/product.entity';
import { LotOrmEntity } from 'src/contexts/purchase-management/lot/infraestructura/persistence/typeorm/entities/lot.orm-entity';
import { InventoryItemOrmEntity } from 'src/contexts/inventory-management/inventory-item/infraestructure/persistence/typeorm/entities/inventory-item.orm-entity';
import { LotMapper } from 'src/contexts/purchase-management/lot/infraestructura/persistence/typeorm/mappers/lot.mapper';
import { ProductValidateException } from 'src/contexts/product-management/product/domain/exceptions/product-validate.exception';

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  private readonly productRepository: Repository<ProductOrmEntity>;

  constructor(
    private readonly datasource: DataSource
  ) {
    this.productRepository = this.datasource.getRepository(ProductOrmEntity);
  }

  async findByEstablishmentAndSku(establishmentId: bigint, sku: string): Promise<ProductEntity | null> {
    const orm = await this.productRepository.findOne({ where: { establishmentId: establishmentId, sku } });
    return orm ? ProductTypeOrmMapper.toDomain(orm) : null;
  }

  async findByEstablishmentAndUniversalBarCode(establishmentId: bigint, barCode: string): Promise<ProductEntity | null> {
    const orm = await this.productRepository.findOne({ where: { establishmentId: establishmentId, universalBarCode: barCode } });
    return orm ? ProductTypeOrmMapper.toDomain(orm) : null;
  }

  async saveProductWithLotAdnInventoryItem(product: ProductEntity): Promise<ProductEntity> {
    let productOrm = ProductTypeOrmMapper.toOrm(product);
    let lotOrm = productOrm.lots ? productOrm.lots[0] : undefined;
    let inventoryItemOrm = lotOrm?.inventoryItems ? lotOrm.inventoryItems[0] : undefined;

    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Guarda el producto
      productOrm = {
        ...productOrm,
        lots: undefined,
        inventoryItems: undefined,
      }
      const savedProduct = await queryRunner.manager.save(ProductOrmEntity, productOrm);

      // Guarda los lots y les asigna el producto guardado
      if (lotOrm) {
        lotOrm = {
          ...lotOrm,
          productId: savedProduct.productId,
          inventoryItems: undefined,
          product: undefined
        }
        const savedLot = await queryRunner.manager.save(LotOrmEntity, lotOrm);

        // Guarda los inventoryItems de cada lot, asignando el lot y el producto guardados
        if (inventoryItemOrm) {
          inventoryItemOrm = {
            ...inventoryItemOrm,
            lotId: savedLot.lotId,
            productId: savedLot.productId
          };
          await queryRunner.manager.save(InventoryItemOrmEntity, inventoryItemOrm);

        } else {
          throw new ProductValidateException(`Producto no registrado, Error en los datos de inventario.`); 
        }
      } else {
        throw new ProductValidateException(`Producto no registrado, Error en los datos del lote.`); 
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return ProductTypeOrmMapper.toDomain(savedProduct);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      if (error instanceof QueryFailedError) {

        // ...removed console.log...
        throw new ProductValidateException(`Producto no registrado, verifica los datos ingresados.`);
      }      
      throw error;
    }
  }

  async save(product: ProductEntity): Promise<ProductEntity> {
    try {
      const orm = ProductTypeOrmMapper.toOrm(product);
      const saved = await this.productRepository.save(orm);
      return ProductTypeOrmMapper.toDomain(saved);
    } catch (error) {
      throw error;
    }
  }

  delete(entityId: bigint): Promise<ProductEntity | null> {
    throw new Error('Este metodo no esta implementado');
  }

  async findAll(): Promise<[] | ProductEntity[]> {
    const result = await this.productRepository.find({
      relations: ['establishment', 'category', 'brand', 'season', 'lots', 'lots.inventoryItems'],
    });

    if (result.length > 0) {
      return result.map((orm) => ProductTypeOrmMapper.toDomain(orm));
    }

    return Promise.resolve([]);
  }

  findById(entityId: bigint): Promise<ProductEntity | null> {
    throw new Error('Este metodo no esta implementado');
  }
}
