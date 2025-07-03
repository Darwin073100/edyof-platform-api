import { UserRoleEntity } from "../entities/user-role.entity";

export const USER_ROLE_REPOSITORY = Symbol('USER_ROLE_REPOSITORY');

export interface UserRoleRepository{
    save(entity: UserRoleEntity):Promise<UserRoleEntity>;
    findUserRoles(userId: bigint): Promise<UserRoleEntity[]>;
}