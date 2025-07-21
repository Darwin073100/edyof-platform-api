import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { ProductTypeOrmMapper } from '../mappers/product.mapper';
import { ProductRepository } from 'src/contexts/product-management/product/domain/repositories/product.repository';
import { ProductEntity } from 'src/contexts/product-management/product/domain/entities/product.entity';

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly ormRepo: Repository<ProductOrmEntity>,
  ) {}

  async findByEstablishmentAndSku(establishmentId: bigint, sku: string): Promise<ProductEntity | null> {
    const orm = await this.ormRepo.findOne({ where: { establishmentId: establishmentId, sku } });
    return orm ? ProductTypeOrmMapper.toDomain(orm) : null;
  }

  async findByEstablishmentAndUniversalBarCode(establishmentId: bigint, barCode: string): Promise<ProductEntity | null> {
    const orm = await this.ormRepo.findOne({ where: { establishmentId: establishmentId, universalBarCode: barCode } });
    return orm ? ProductTypeOrmMapper.toDomain(orm) : null;
  }

  async save(product: ProductEntity): Promise<ProductEntity> {
        try{
            const orm = ProductTypeOrmMapper.toOrm(product);
        const saved = await this.ormRepo.save(orm);
        return ProductTypeOrmMapper.toDomain(saved);
        } catch (error){
            throw error;
        }
  }

  delete(entityId: bigint): Promise<ProductEntity | null> {
    throw new Error('Este metodo no esta implementado');
  }
  
  async findAll(): Promise<[] | ProductEntity[]> {
    const result = await  this.ormRepo.find({
      relations: ['establishment', 'category', 'brand', 'season', 'lots', 'lots.inventoryItems'],
    });

    if(result.length > 0){
      return result.map((orm) => ProductTypeOrmMapper.toDomain(orm));  
    }

    return Promise.resolve([]);
  }

  findById(entityId: bigint): Promise<ProductEntity | null> {
    throw new Error('Este metodo no esta implementado');
  }
}
