import { ConflictException, Injectable } from "@nestjs/common";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { DataSource, Repository } from "typeorm";
import { UserOrmEntity } from "../entities/user.orm-entity";
import { UserMapper } from "../mappers/user.mapper";
import { UserAlreadyExistsException } from "../../domain/exceptions/user-already-exists.exception";

@Injectable()
export class TyperomUserRepository implements UserRepository{
    private repository:Repository<UserOrmEntity>;
    constructor(private dataSource: DataSource){
        this.repository = this.dataSource.getRepository(UserOrmEntity);
    }
    
    async save(entity: UserEntity): Promise<UserEntity> {
        try {
            const isValidUsername = await this.findByUsername(entity.username.value);
            if(isValidUsername){
                throw new UserAlreadyExistsException('El nombre de usuario ya existe.');
            }

            const isValidEmail = await this.findByEmail(entity.email.value);
            if(isValidEmail){
                console.log('Correo no encontrado');
                throw new UserAlreadyExistsException('El correo electrónico ya está en uso.');
            }
            const ormEntity = UserMapper.toOrmEntity(entity);
            const resp = await this.repository.save(ormEntity);
            return UserMapper.toDomain(resp);
        } catch (error) {
            console.log(error);
            
            throw error;
        }
    }
    
    async saveWithEmployee(entity: UserEntity): Promise<UserEntity> {
        try {    
            const ormEntity = UserMapper.toOrmEntity(entity);
            const resp = await this.repository.save(ormEntity);
            return UserMapper.toDomain(resp);
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const resp = await this.repository.findOne({
            where:{email: email as any},
            relations: [
                'userRoles',
                'userRoles.role',
                'userRoles.role.rolePermissions',
                'userRoles.role.rolePermissions.permission'
            ]
        });
        
        if(!resp){
            return null;
        }
        const entity = UserMapper.toDomain(resp);
        return entity;
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        const resp = await this.repository.findOne({
            where:{username: username as any}
        });
        
        if(!resp){
            return null;
        }
        const entity = UserMapper.toDomain(resp);
        return entity;
    }

    async findById(id: bigint): Promise<UserEntity | null> {
        const resp = await this.repository.findOne({
            where:{userId: id as any},
            relations: [
                'userRoles',
                'employee',
                'userRoles.role',
                'userRoles.role.rolePermissions',
                'userRoles.role.rolePermissions.permission'
            ]
        });
        
        if(!resp){
            return null;
        }
        const entity = UserMapper.toDomain(resp);
        return entity;
    }
    async findByIdWithWorkspace(id: bigint): Promise<UserEntity | null> {
        const resp = await this.repository.findOne({
            where:{userId: id as any},
            relations: [
                'userRoles',
                'employee',
                'employee.branchOffice',
                'employee.branchOffice.establishment',
                'userRoles.role',
                'userRoles.role.rolePermissions',
                'userRoles.role.rolePermissions.permission'
            ]
        });
        
        if(!resp){
            return null;
        }
        const entity = UserMapper.toDomain(resp);
        return entity;
    }

}