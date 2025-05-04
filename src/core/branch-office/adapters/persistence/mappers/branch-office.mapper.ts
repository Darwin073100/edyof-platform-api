import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { AddressMapper } from "../../../../address/adapters/persistence/mappers/address.mapper";
import { plainToInstance } from "class-transformer";
import { EstablishmentMapper } from "../../../../establishment/adapters/persistence/mappers/establishment.mapper";
import { BranchOfficeSchema } from "../schemas/branch-office.schema";
import { BranchOfficeNameVO } from "src/core/branch-office/value-objects/branch-office.name.vo";

export class BranchOfficeMapper{
    static toDomain(branchOfficeSchema?: BranchOfficeSchema): BranchOfficeEntity {

        const branchOfficeEntity = plainToInstance(BranchOfficeEntity, branchOfficeSchema);

        if(!branchOfficeSchema) return branchOfficeEntity;
        branchOfficeEntity.name = BranchOfficeNameVO.set(branchOfficeSchema.name);
        branchOfficeEntity.address = AddressMapper.toDomain(branchOfficeSchema.address);
        branchOfficeEntity.educationalCenter = EstablishmentMapper.toDomain(branchOfficeSchema.educationalCenter);
        return branchOfficeEntity;
    }
    
    static toPersistence(branchOfficeEntity?: BranchOfficeEntity): BranchOfficeSchema {
        const branchOfficeSchema = plainToInstance(BranchOfficeSchema, branchOfficeEntity);

        if(!branchOfficeEntity ) return branchOfficeSchema;

        branchOfficeSchema.name = branchOfficeEntity.name.get();
        branchOfficeSchema.address = AddressMapper.toPersistence(branchOfficeEntity.address);
        branchOfficeSchema.educationalCenter = EstablishmentMapper.toPersistence(branchOfficeEntity.educationalCenter);
        return branchOfficeSchema;
    }

    static toDomainList(branchOfficeSchemas?: BranchOfficeSchema[]){
        return branchOfficeSchemas?.map(item => this.toDomain(item));
    }

    static toPersistenceList(branchOfficeEntities?: BranchOfficeEntity[]){
        return branchOfficeEntities?.map(item => this.toPersistence(item));
    }
    
}   