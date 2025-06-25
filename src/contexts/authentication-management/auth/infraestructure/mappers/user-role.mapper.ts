import { UserRoleEntity } from "../../domain/entities/user-role.entity";
import { UserRoleOrmEntity } from "../entities/user-role.orm-entity";

export class UserRoleMapper{
    static toDomain(ormEntity: UserRoleOrmEntity){
        let domainEntity = UserRoleEntity.reconstitute(
            ormEntity.userId,
            ormEntity.roleId,
            ormEntity.userRoleId
        );
    }
}