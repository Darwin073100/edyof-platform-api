import { Injectable } from '@nestjs/common';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { ProductTypeOrmMapper } from '../mappers/product.mapper';
import { ProductRepository } from 'src/contexts/product-management/product/domain/repositories/product.repository';
import { ProductEntity } from 'src/contexts/product-management/product/domain/entities/product.entity';
import { LotOrmEntity } from 'src/contexts/purchase-management/lot/infraestructura/persistence/typeorm/entities/lot.orm-entity';
import { InventoryOrmEntity } from 'src/contexts/inventory-management/inventory/infraestructure/persistence/typeorm/entities/inventory.orm-entity';
import { ProductValidateException } from 'src/contexts/product-management/product/domain/exceptions/product-validate.exception';
import { LotAlreadyExistsException } from 'src/contexts/purchase-management/lot/domain/exceptions/lot-already-exists.exception';
import { LotUnitPurchaseOrmEntity } from 'src/contexts/purchase-management/lot/infraestructura/persistence/typeorm/entities/lot-unit-purchase.orm-entity';
import { ProductNotFoundException } from 'src/contexts/product-management/product/domain/exceptions/product-not-found.exception';
import { InventoryItemOrmEntity } from 'src/contexts/inventory-management/inventory-item/infraestructure/persistence/typeorm/entities/inventory-item.orm-entity';

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
    let inventoryOrm = productOrm.inventories ? productOrm.inventories[0] : null;
    let inventoryItemOrm = inventoryOrm?.inventoryItems ? inventoryOrm.inventoryItems : undefined;
    // let inventoryItemOrm = lotOrm?.inventoryItems ? lotOrm.inventoryItems[0] : undefined;
    let lotUnitPurchaseOrm = lotOrm?.lotUnitPurchases;

    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Guarda el producto
      productOrm = {
        ...productOrm,
        lots: undefined,
        inventories: undefined,
      }
      let savedProduct = await queryRunner.manager.save(ProductOrmEntity, productOrm);

      // Guarda los lots y les asigna el producto guardado
      if (lotOrm) {
        lotOrm = {
          ...lotOrm,
          productId: savedProduct.productId,
          inventoryItems: undefined,
          product: undefined,
          lotUnitPurchases: undefined,
        }
        let savedLot = await queryRunner.manager.save(LotOrmEntity, lotOrm);
        if (lotUnitPurchaseOrm && lotUnitPurchaseOrm.length > 0) {
          // verificar que no vengan repetidos los unidades de compra, 
          // lanzar un error si es así y hacer rollback de la transacción
          const uniqueUnits = new Set();
          for (const item of lotUnitPurchaseOrm) {
            if (uniqueUnits.has(item.unit)) {
              throw new LotAlreadyExistsException('Las unidades de compra no pueden estar duplicadas');
            }
            uniqueUnits.add(item.lotUnitPurchaseId);
          }
          // Asignar lotId a cada lotUnitPurchase
          lotUnitPurchaseOrm.forEach(item => {
            item.lotId = savedLot.lotId;
          });
          let savedLotUnitPurchase = await queryRunner.manager.save(LotUnitPurchaseOrmEntity, lotUnitPurchaseOrm);
          savedLot = {
            ...savedLot,
            lotUnitPurchases: savedLotUnitPurchase,
          }
        }

        // Guarda los inventoryItems de cada lot, asignando el lot y el producto guardados
        if (inventoryOrm) {
          inventoryOrm = {
            ...inventoryOrm,
            lotId: savedLot.lotId,
            productId: savedLot.productId,
            lot: undefined,
            product: undefined,
            inventoryItems: undefined
          };
          let savedInventory = await queryRunner.manager.save(InventoryOrmEntity, inventoryOrm);
          if (inventoryItemOrm && inventoryItemOrm.length > 0) {
            // verificar que no vengan repetidas las locations, 
            // lanzar un error si es así y hacer rollback de la transacción
            const uniqueLocations = new Set();
            for (const item of inventoryItemOrm) {
              if (uniqueLocations.has(item.location)) {
                throw new ProductValidateException('Las ubicaciones de inventario no pueden estar duplicadas');
              }
              uniqueLocations.add(item.location);
            }
            // Asignar inventoryId a cada inventoryItem
            inventoryItemOrm.forEach(item => {
              item.inventoryId = savedInventory.inventoryId;
            });
            const savedInventoryItem = await queryRunner.manager.save(InventoryItemOrmEntity, inventoryItemOrm);
            savedInventory = {
              ...savedInventory,
              lot: savedLot,
              product: savedProduct,
              inventoryItems: savedInventoryItem
            }
          } else {
            throw new ProductValidateException(`Producto no registrado, Error en los datos de item del inventario.`);
          }
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
      console.log(error);
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

  async findById(entityId: bigint): Promise<ProductEntity | null> {
    try {
      const result = await this.productRepository.findOne({
        where: { productId: entityId },
        relations: ['establishment', 'category', 'brand', 'season', 'lots', 'lots.inventoryItems'],
      });

      if (!result) {
        throw new ProductNotFoundException('El producto que buscas no existe');
      }

      return ProductTypeOrmMapper.toDomain(result);;
    } catch (error) {
      throw error;
    }
  }
}
