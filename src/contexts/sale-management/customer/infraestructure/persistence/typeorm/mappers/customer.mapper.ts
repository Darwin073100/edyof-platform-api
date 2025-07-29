import { CustomerEntity } from "src/contexts/sale-management/customer/domain/entities/customer.entity";
import { CustomerOrmEntity } from "../entities/customer.orm-entity";
import { AddressMapper } from "src/shared/infraestructure/mappers/address.mapper";
import { CustomerFirstNameVO } from "src/contexts/sale-management/customer/domain/value-objects/customer-first-name.vo";
import { CustomerRFCVO } from "src/contexts/sale-management/customer/domain/value-objects/customer-rfc.vo";
import { CustomerPhoneNumberVO } from "src/contexts/sale-management/customer/domain/value-objects/customer-phone-number.vo";
import { CustomerEmailVO } from "src/contexts/sale-management/customer/domain/value-objects/customer-email.vo";
import { CustomerTypeVO } from "src/contexts/sale-management/customer/domain/value-objects/customer-customer-type.vo";
import { CustomerLastNameVO } from "src/contexts/sale-management/customer/domain/value-objects/customer-last-name.vo";
import { CustomerCompanyNameVO } from "src/contexts/sale-management/customer/domain/value-objects/customer-company-name.vo";

export class CustomerMapper {
  /**
   * Convierte una entidad de dominio Customer a una entidad ORM CustomerOrmEntity.
   * 
   * @param domainEntity La entidad de dominio Customer a mapear.
   * @returns Una instancia de CustomerOrmEntity.
   */
  public static toOrmEntity(domainEntity: CustomerEntity): CustomerOrmEntity {
    const ormEntity = new CustomerOrmEntity();
    
    // Mapear propiedades básicas
    ormEntity.customerId = domainEntity.customerId;
    ormEntity.addressId = domainEntity.addressId;
    ormEntity.firstName = domainEntity.firstName.value;
    ormEntity.lastName = domainEntity.lastName?.value;
    ormEntity.companyName = domainEntity.companyName?.value;
    ormEntity.phoneNumber = domainEntity?.phoneNumber?.value;
    ormEntity.rfc = domainEntity?.rfc?.value;
    ormEntity.email = domainEntity?.email?.value;
    ormEntity.customerType = domainEntity?.customerType?.value;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt ?? null;
    ormEntity.deletedAt = domainEntity.deletedAt ?? null;

    // Mapear la dirección
    const addressOrmEntity = domainEntity.address? AddressMapper.toOrm(domainEntity.address): undefined;
    ormEntity.address = addressOrmEntity;

    return ormEntity;
  }
  /**
   * Convierte una entidad ORM CustomerOrmEntity a una entidad de dominio CustomerEntity.
   * 
   * @param ormEntity La entidad ORM CustomerOrmEntity a mapear.
   * @returns Una instancia de CustomerEntity.
   */
  public static toDomainEntity(ormEntity: CustomerOrmEntity): CustomerEntity {
    // Crear el Value Object de nombre
    const firstNameVo = CustomerFirstNameVO.create(ormEntity.firstName);
    const lastNameVo = ormEntity.lastName? CustomerLastNameVO.create(ormEntity.lastName): undefined;
    const companyNameVo = ormEntity.companyName? CustomerCompanyNameVO.create(ormEntity.companyName): undefined;
    const phoneNumberVo = ormEntity.phoneNumber? CustomerPhoneNumberVO.create(ormEntity.phoneNumber): undefined;
    const rfcVo = ormEntity.rfc? CustomerRFCVO.create(ormEntity.rfc): null;
    const emailVo = ormEntity.email? CustomerEmailVO.create(ormEntity.email): null;
    const notesVo = ormEntity.customerType? CustomerTypeVO.create(ormEntity.customerType): null;

    // Reconstituir la entidad de dominio
    const domainEntity =  CustomerEntity.reconstitute(
      ormEntity.customerId,
      firstNameVo,
      ormEntity.createdAt,
      ormEntity.addressId,
      lastNameVo,
      companyNameVo,
      phoneNumberVo,
      ormEntity.address? AddressMapper.toDomain(ormEntity.address): undefined,
      rfcVo,
      emailVo,
      notesVo,
      ormEntity.updatedAt,
      ormEntity.deletedAt
    );

    return domainEntity;
  }
}
