import { EstablishmentEntity } from "src/core/establishment/domain/entities/establishment.entity";
import { EstablishmentSchema } from "../schemas/establishment.schema";
import { plainToInstance } from "class-transformer";
import { BranchOfficeMapper } from "../../../../branch-office/adapters/persistence/mappers/branch-office.mapper";
import { EstablishmentNameVO } from "src/core/establishment/value-objects/establishment.name.vo";

export class EstablishmentMapper{
    static toDomain(schema?: EstablishmentSchema): EstablishmentEntity{
        const establishmentEntity = plainToInstance(EstablishmentEntity, schema);
        if(!schema) return establishmentEntity;
        establishmentEntity.name = EstablishmentNameVO.set(schema.name);
        establishmentEntity.branchOffices = BranchOfficeMapper.toDomainList(schema?.branchOffices);
        return establishmentEntity;
    }

    static toPersistence(entity?: EstablishmentEntity): EstablishmentSchema{
        const establishmentSchema = plainToInstance(EstablishmentSchema, entity);
        if(!entity) return establishmentSchema;
        establishmentSchema.name = entity.name.get();
        establishmentSchema.branchOffices = BranchOfficeMapper.toPersistenceList(entity?.branchOffices);
        return establishmentSchema;
    }
}