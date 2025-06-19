import { RoleEntity } from "src/contexts/authentication-management/role/domain/entities/role-entity";
import { RoleOrmEntity } from "../entities/role.orm-entity";
import { RoleNameVO } from "src/contexts/authentication-management/role/domain/value-objects/role-name.vo";
import { RoleDescriptionVO } from "src/contexts/authentication-management/role/domain/value-objects/role-description.vo";

export class CategoryMapper {
    // Domain to TypeORM
    static toTypeOrmEntity(domainEntity: RoleEntity): RoleOrmEntity {
        const typeOrmEntity = new RoleOrmEntity();
        typeOrmEntity.roleId = domainEntity.roleId;
        typeOrmEntity.name = domainEntity.name.name;
        typeOrmEntity.description = domainEntity.description?.description;
        typeOrmEntity.createdAt = domainEntity.createdAt;
        typeOrmEntity.updatedAt = domainEntity.updatedAt;
        return typeOrmEntity;
    }

    // TypeORM to Domain
    static toDomainEntity(typeOrmEntity: RoleOrmEntity): RoleEntity {
        return RoleEntity.reconstitute(
            typeOrmEntity.roleId,
            RoleNameVO.create(typeOrmEntity.name),
            typeOrmEntity.createdAt,
            typeOrmEntity.updatedAt,
            typeOrmEntity.deletedAt,
            typeOrmEntity.description ? RoleDescriptionVO.create(typeOrmEntity.description) : null,
        );
    }
}