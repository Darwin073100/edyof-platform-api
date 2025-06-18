import { UserEntity } from "../entities/user.entity";

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository{
    save(entity: UserEntity):Promise<UserEntity>;
    findByEmail(email: string):Promise<UserEntity |null>;
    findByUsername(username: string):Promise<UserEntity |null>;
    findById(id: bigint):Promise<UserEntity |null>;
}