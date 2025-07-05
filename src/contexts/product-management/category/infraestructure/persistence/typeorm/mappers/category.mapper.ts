import { CategoryEntity } from "src/contexts/product-management/category/domain/entities/category-entity";
import { CategoryOrmEntity } from "../entities/category.orm-entity";
import { CategoryNameVO } from "src/contexts/product-management/category/domain/value-objects/category-name.vo";
import { CategoryDescriptionVO } from "src/contexts/product-management/category/domain/value-objects/category-description.vo";
import { ProductTypeOrmMapper } from 'src/contexts/product-management/product/infraestructure/persistence/typeorm/mappers/product.mapper';

export class CategoryMapper {
    // Domain to TypeORM
    static toTypeOrmEntity(domainEntity: CategoryEntity): CategoryOrmEntity {
        const typeOrmEntity = new CategoryOrmEntity();
        typeOrmEntity.categoryId = domainEntity.categoryId;
        typeOrmEntity.name = domainEntity.name.name;
        typeOrmEntity.description = domainEntity.description?.description;
        typeOrmEntity.createdAt = domainEntity.createdAt;
        typeOrmEntity.updatedAt = domainEntity.updatedAt;
        // Mapear productos si existen
        if (domainEntity.products) {
            typeOrmEntity.products = domainEntity.products.map(product => ProductTypeOrmMapper.toOrm(product));
        }
        return typeOrmEntity;
    }

    // TypeORM to Domain
    static toDomainEntity(typeOrmEntity: CategoryOrmEntity): CategoryEntity {
        return CategoryEntity.reconstitute(
            typeOrmEntity.categoryId,
            CategoryNameVO.create(typeOrmEntity.name),
            typeOrmEntity.createdAt,
            typeOrmEntity.updatedAt,
            typeOrmEntity.deletedAt,
            typeOrmEntity.description ? CategoryDescriptionVO.create(typeOrmEntity.description) : null,
            typeOrmEntity.products ? typeOrmEntity.products.map(productOrm => ProductTypeOrmMapper.toDomain(productOrm)) : undefined
        );
    }
}