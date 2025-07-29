import { AddressEntity } from "src/shared/domain/value-objects/address.vo";
import { AddressOrmEntity } from "../typeorm/address.orm-entity";

export class AddressMapper {
    static toDomain(ormEntity: AddressOrmEntity): AddressEntity {
        const addressVo = AddressEntity.create({
            street: ormEntity.street,
            externalNumber: ormEntity.externalNumber,
            internalNumber: ormEntity.internalNumber,
            municipality: ormEntity.municipality,
            neighborhood: ormEntity.neighborhood,
            city: ormEntity.city,
            state: ormEntity.state,
            postalCode: ormEntity.postalCode,
            country: ormEntity.country,
            reference: ormEntity.reference
        });
        return addressVo;
    }

    static toOrm(domainEntity: AddressEntity): AddressOrmEntity {
        const addressOrmEntity = new AddressOrmEntity();
        addressOrmEntity.street = domainEntity.street;
        addressOrmEntity.externalNumber = domainEntity.externalNumber;
        addressOrmEntity.internalNumber = domainEntity.internalNumber;
        addressOrmEntity.municipality = domainEntity.municipality;
        addressOrmEntity.neighborhood = domainEntity.neighborhood;
        addressOrmEntity.city = domainEntity.city;
        addressOrmEntity.state = domainEntity.state;
        addressOrmEntity.postalCode = domainEntity.postalCode;
        addressOrmEntity.country = domainEntity.country;
        addressOrmEntity.reference = domainEntity.reference;
        return addressOrmEntity;
    }
}