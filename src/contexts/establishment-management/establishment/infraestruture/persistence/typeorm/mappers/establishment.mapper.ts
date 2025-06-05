import { EstablishmentEntity } from "src/contexts/establishment-management/establishment/domain/entities/establishment.entity";
import { EstablishmentOrmEntity } from "../entities/establishment-orm-entity";
import { Name } from "src/contexts/establishment-management/establishment/domain/values-objects/name.vo";

export class EstablishmentMapper{
    static toOrmEntity(domainEntity: EstablishmentEntity){
        const ormEntity = new EstablishmentOrmEntity();
        ormEntity.name = domainEntity.name.value;
        ormEntity.createdAt = domainEntity.createdAt;
        ormEntity.updatedAt = domainEntity.updatedAt;
        ormEntity.deletedAt = domainEntity.deletedAt;
    } 

    static toDomainEntity(ormEntity: EstablishmentOrmEntity){
        const domainEntity = EstablishmentEntity.reconstitute(
            ormEntity.establishmentId,
            Name.create(ormEntity.name),
            ormEntity.createdAt,
            ormEntity.updatedAt,
            ormEntity.deletedAt
        );
        return domainEntity;
    }
}