import { UserEntity } from "../../domain/entities/user.entity";
import { UserEmailVO } from "../../domain/value-objects/user.email.vo";
import { UserPasswordHashVO } from "../../domain/value-objects/user.password-hash.vo";
import { UserUsernameVO } from "../../domain/value-objects/user.username.vo";
import { UserOrmEntity } from "../entities/user.orm-entity";
import { UserRoleMapper } from "./user-role.mapper";

export class UserMapper{
    static toOrmEntity(domainEntity: UserEntity):UserOrmEntity {
        const userRoles = domainEntity?.userRoles?.map(item => UserRoleMapper.toOrmEntity(item));

        const ormEntity: UserOrmEntity = {
            userId: domainEntity.userId,
            employeeId: domainEntity.employeeId,
            username: domainEntity.username.value,
            email: domainEntity.email.value,
            passwordHash: domainEntity.passwordHash.value,
            isActive: domainEntity.isActive,
            lastLogin: domainEntity.lastLogin,
            userRoles: userRoles && [],
            createdAt: domainEntity.createdAt,
            updatedAt: domainEntity.updatedAt,
            deletedAt: domainEntity.deletedAt
        }
        return ormEntity;
    }

    static toDomain(ormEntity: UserOrmEntity):UserEntity{

        const userRoles = ormEntity?.userRoles?.map(item => UserRoleMapper.toDomain(item));
        
        const domainEntity = UserEntity.reconstitute(
            ormEntity.userId,
            ormEntity.employeeId,
            UserUsernameVO.create(ormEntity.username),
            UserEmailVO.create(ormEntity.email),
            UserPasswordHashVO.create(ormEntity.passwordHash),
            ormEntity.isActive,
            ormEntity.lastLogin,
            ormEntity.createdAt,
            userRoles && [],
            ormEntity.updatedAt,
            ormEntity.deletedAt
        );
        return domainEntity;
    }
}