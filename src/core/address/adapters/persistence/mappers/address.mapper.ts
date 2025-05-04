import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { AddressSchema } from "../schemas/address.schema";
import { plainToInstance } from "class-transformer";
import { AddressPostalCodeVO } from "src/core/address/value-objects/address.postal-code.vo";
import { AddressStreetVO } from "src/core/address/value-objects/address.street.vo";
import { AddressInteriorNumberVO } from "src/core/address/value-objects/address.interior-number.vo";
import { AddressExteriorNumberVO } from "src/core/address/value-objects/address.exterior-number.vo";
import { AddressDistrictVO } from "src/core/address/value-objects/address.district.vo";
import { AddressCityVO } from "src/core/address/value-objects/address.city.vo";
import { AddressStateVO } from "src/core/address/value-objects/address.state.vo";

export class AddressMapper {
    static toDomain(addressSchema?: AddressSchema): AddressEntity {
        const addressEntity:AddressEntity = plainToInstance(AddressEntity, addressSchema);
        if (!addressSchema) return addressEntity;
        addressEntity.postalCode = AddressPostalCodeVO.set(addressSchema.postalCode);
        addressEntity.street = AddressStreetVO.set(addressSchema.street);
        addressEntity.interiorNumber = AddressInteriorNumberVO.set(addressSchema.interiorNumber);
        addressEntity.exteriorNumber = AddressExteriorNumberVO.set(addressSchema.exteriorNumber);
        addressEntity.district = AddressDistrictVO.set(addressSchema.district);
        addressEntity.city = AddressCityVO.set(addressSchema.city);
        addressEntity.state = AddressStateVO.set(addressSchema.state);
        return addressEntity;
    }

    static toPersistence(addressEntity?: AddressEntity): AddressSchema {
        const addressSchema: AddressSchema = plainToInstance(AddressSchema, addressEntity);
        if (!addressEntity) return addressSchema;
        addressSchema.postalCode = addressEntity.postalCode.get();
        addressSchema.street = addressEntity.street.get();
        addressSchema.interiorNumber = addressEntity.interiorNumber.get();
        addressSchema.exteriorNumber = addressEntity.exteriorNumber.get();
        addressSchema.district = addressEntity.district.get();
        addressSchema.city = addressEntity.city.get();
        addressSchema.state = addressEntity.state.get();
        return addressSchema;
    }

    static toDomainList(addressSchemas?: AddressSchema[]){
        return addressSchemas?.map(item=> this.toDomain(item));
    }

    static toPersistenceList(addressEntities?: AddressEntity[]){
        return addressEntities?.map(item=> this.toPersistence(item));
    }
}