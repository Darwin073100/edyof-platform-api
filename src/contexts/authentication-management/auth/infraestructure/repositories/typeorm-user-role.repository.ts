import { DataSource, Repository } from "typeorm";
import { UserRoleEntity } from "../../domain/entities/user-role.entity";
import { UserRoleRepository } from "../../domain/repositories/user-role.repository";
import { UserRoleOrmEntity } from "../entities/user-role.orm-entity";
import { UserRoleMapper } from "../mappers/user-role.mapper";
import { Injectable } from "@nestjs/common";
import { UserOrmEntity } from "../entities/user.orm-entity";
import { UserAlreadyExistsException } from "../../domain/exceptions/user-already-exists.exception";

@Injectable()
export class TypeormUserRoleRepository implements UserRoleRepository{
    private userRoleRepository: Repository<UserRoleOrmEntity>;
    private userRepository: Repository<UserOrmEntity>;
    
    constructor(private readonly datasource: DataSource){
        this.userRoleRepository = this.datasource.getRepository(UserRoleOrmEntity);
        this.userRepository = this.datasource.getRepository(UserOrmEntity);
    }
    
    async save(entity: UserRoleEntity):Promise<UserRoleEntity>{
        const ormEntity = UserRoleMapper.toOrmEntity(entity);
        const isValidUsername = await this.userRepository.findOne({where:{username: ormEntity.user?.username}});
        if(isValidUsername){
            throw new UserAlreadyExistsException('El nombre de usuario ya existe.');
        }

        const isValidEmail = await this.userRepository.findOne({where:{email: ormEntity.user?.email}});
        if(isValidEmail){
            console.log('Correo no encontrado');
            throw new UserAlreadyExistsException('El correo electrónico ya está en uso.');
        }
        const result = await this.userRoleRepository.save(ormEntity);
        return UserRoleMapper.toDomain(result);
    }
}