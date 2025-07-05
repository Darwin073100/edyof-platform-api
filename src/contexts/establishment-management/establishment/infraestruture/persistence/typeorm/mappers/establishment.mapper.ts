import { EstablishmentEntity } from "src/contexts/establishment-management/establishment/domain/entities/establishment.entity";
import { EstablishmentOrmEntity } from "../entities/establishment-orm-entity";
import { Name } from "src/contexts/establishment-management/establishment/domain/values-objects/name.vo";
import { ProductTypeOrmMapper } from 'src/contexts/product-management/product/infraestructure/persistence/typeorm/mappers/product.mapper';

export class EstablishmentMapper{
    static toOrmEntity(domainEntity: EstablishmentEntity){
        const ormEntity = new EstablishmentOrmEntity();
        ormEntity.name = domainEntity.name.value;
        ormEntity.createdAt = domainEntity.createdAt;
        ormEntity.updatedAt = domainEntity.updatedAt;
        ormEntity.deletedAt = domainEntity.deletedAt;
        // Mapear productos si existen
        if (domainEntity.products) {
            ormEntity.products = domainEntity.products.map(product => ProductTypeOrmMapper.toOrm(product));
        }
        return ormEntity;
    } 

    static toDomainEntity(ormEntity: EstablishmentOrmEntity){
        return EstablishmentEntity.reconstitute(
            ormEntity.establishmentId,
            Name.create(ormEntity.name),
            ormEntity.createdAt,
            ormEntity.updatedAt,
            ormEntity.deletedAt,
            ormEntity.products ? ormEntity.products.map(productOrm => ProductTypeOrmMapper.toDomain(productOrm)) : undefined
        );
    }
}