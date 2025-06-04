import { CategoryEntity } from "src/contexts/product-management/category/domain/entities/category-entity";
import { CategoryOrmEntity } from "../entities/category.orm-entity";
import { CategoryNameVO } from "src/contexts/product-management/category/domain/value-objects/category-name.vo";
import { CategoryDescriptionVO } from "src/contexts/product-management/category/domain/value-objects/category-description.vo";

export class CategoryMapper {
    // Domain to TypeORM
    static toTypeOrmEntity(domainEntity: CategoryEntity): CategoryOrmEntity {
        const typeOrmEntity = new CategoryOrmEntity();
        typeOrmEntity.categoryId = domainEntity.categoryId;
        typeOrmEntity.name = domainEntity.name.name;
        typeOrmEntity.description = domainEntity.description?.description;
        typeOrmEntity.createdAt = domainEntity.createdAt;
        typeOrmEntity.updatedAt = domainEntity.updatedAt;
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
        );
    }
}