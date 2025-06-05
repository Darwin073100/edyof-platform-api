import { BrandEntity } from "src/contexts/product-management/brand/domain/entities/brand.entity";
import { BrandOrmEntity } from "../entities/brand-orm-entity";
import { BrandNameVO } from "src/contexts/product-management/brand/domain/values-objects/brand-name.vo";

export class BrandMapper{
    static toOrmEntity(domainEntity: BrandEntity){
        const ormEntity = new BrandOrmEntity();
        ormEntity.name = domainEntity.name.value;
        ormEntity.createdAt = domainEntity.createdAt;
        ormEntity.updatedAt = domainEntity.updatedAt;
        ormEntity.deletedAt = domainEntity.deletedAt;
    } 

    static toDomainEntity(ormEntity: BrandOrmEntity){
        const domainEntity = BrandEntity.reconstitute(
            ormEntity.brandId,
            BrandNameVO.create(ormEntity.name),
            ormEntity.createdAt,
            ormEntity.updatedAt,
            ormEntity.deletedAt
        );
        return domainEntity;
    }
}