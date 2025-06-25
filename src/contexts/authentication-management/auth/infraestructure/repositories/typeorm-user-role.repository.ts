import { DataSource, Repository } from "typeorm";
import { UserRoleEntity } from "../../domain/entities/user-role.entity";
import { UserRoleRepository } from "../../domain/repositories/user-role.repository";
import { UserRoleOrmEntity } from "../entities/user-role.orm-entity";

export class TypeormUserRoleRepository implements UserRoleRepository{
    private userRoleRepository: Repository<UserRoleOrmEntity>;
    
    constructor(private readonly datasource: DataSource){
        this.userRoleRepository = datasource.getRepository(UserRoleOrmEntity);
    }
    
    save(entity: UserRoleEntity):Promise<UserRoleEntity>{

    }
}