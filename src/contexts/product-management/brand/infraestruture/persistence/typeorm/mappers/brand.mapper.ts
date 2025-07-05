import { BrandEntity } from "src/contexts/product-management/brand/domain/entities/brand.entity";
import { BrandOrmEntity } from "../entities/brand-orm-entity";
import { BrandNameVO } from "src/contexts/product-management/brand/domain/values-objects/brand-name.vo";
import { ProductTypeOrmMapper } from 'src/contexts/product-management/product/infraestructure/persistence/typeorm/mappers/product.mapper';

export class BrandMapper{
    static toOrmEntity(domainEntity: BrandEntity){
        const ormEntity = new BrandOrmEntity();
        ormEntity.name = domainEntity.name.value;
        ormEntity.createdAt = domainEntity.createdAt;
        ormEntity.updatedAt = domainEntity.updatedAt;
        ormEntity.deletedAt = domainEntity.deletedAt;
        // Mapear productos si existen
        if (domainEntity.products) {
            ormEntity.products = domainEntity.products.map(product => ProductTypeOrmMapper.toOrm(product));
        }
        return ormEntity;
    } 

    static toDomainEntity(ormEntity: BrandOrmEntity){
        return BrandEntity.reconstitute(
            ormEntity.brandId,
            BrandNameVO.create(ormEntity.name),
            ormEntity.createdAt,
            ormEntity.updatedAt,
            ormEntity.deletedAt,
            ormEntity.products ? ormEntity.products.map(productOrm => ProductTypeOrmMapper.toDomain(productOrm)) : undefined
        );
    }
}