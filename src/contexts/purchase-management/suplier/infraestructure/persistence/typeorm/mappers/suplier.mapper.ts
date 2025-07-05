import { SuplierOrmEntity } from "../entities/suplier.orm-entity";
import { AddressOrmEntity } from "src/shared/infraestructure/typeorm/address.orm-entity";
import { AddressEntity } from "src/shared/domain/value-objects/address.vo";
import { SuplierEntity } from "src/contexts/purchase-management/suplier/domain/entities/suplier.entity";
import { SuplierNameVO } from "src/contexts/purchase-management/suplier/domain/value-objects/suplier-name.vo";
import { SuplierPhoneNumberVO } from "src/contexts/purchase-management/suplier/domain/value-objects/suplier-phone-number.vo";
import { SuplierContactPersonVO } from "src/contexts/purchase-management/suplier/domain/value-objects/suplier-contact-person.vo";
import { SuplierRFCVO } from "src/contexts/purchase-management/suplier/domain/value-objects/suplier-rfc.vo";
import { SuplierEmailVO } from "src/contexts/purchase-management/suplier/domain/value-objects/suplier-email.vo";
import { SuplierNotesVO } from "src/contexts/purchase-management/suplier/domain/value-objects/suplier-notes.vo";

/**
 * SuplierMapper es una clase que se encarga de transformar
 * entre la entidad de dominio Suplier y la entidad ORM SuplierOrmEntity.
 * 
 * Este mapper es esencial para mantener la separación entre el dominio
 * y la capa de infraestructura, permitiendo que cada uno evolucione
 * de manera independiente.
 */
export class SuplierMapper {
  /**
   * Convierte una entidad de dominio Suplier a una entidad ORM SuplierOrmEntity.
   * 
   * @param domainEntity La entidad de dominio Suplier a mapear.
   * @returns Una instancia de SuplierOrmEntity.
   */
  public static toOrmEntity(domainEntity: SuplierEntity): SuplierOrmEntity {
    const ormEntity = new SuplierOrmEntity();
    
    // Mapear propiedades básicas
    ormEntity.suplierId = domainEntity.suplierId;
    ormEntity.name = domainEntity.name.value;
    ormEntity.phoneNumber = domainEntity.phoneNumber.value;
    ormEntity.contactPerson = domainEntity.contactPerson?.value;
    ormEntity.rfc = domainEntity.rfc?.value;
    ormEntity.email = domainEntity.email?.value;
    ormEntity.notes = domainEntity.notes?.value;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt ?? null;
    ormEntity.deletedAt = domainEntity.deletedAt ?? null;

    // Mapear la dirección
    const addressOrmEntity = new AddressOrmEntity();
    addressOrmEntity.street = domainEntity.address.street;
    addressOrmEntity.externalNumber = domainEntity.address.externalNumber;
    addressOrmEntity.internalNumber = domainEntity.address.internalNumber;
    addressOrmEntity.municipality = domainEntity.address.municipality;
    addressOrmEntity.neighborhood = domainEntity.address.neighborhood;
    addressOrmEntity.city = domainEntity.address.city;
    addressOrmEntity.state = domainEntity.address.state;
    addressOrmEntity.postalCode = domainEntity.address.postalCode;
    addressOrmEntity.country = domainEntity.address.country;
    addressOrmEntity.reference = domainEntity.address.reference;

    ormEntity.address = addressOrmEntity;

    return ormEntity;
  }

  /**
   * Convierte una entidad ORM SuplierOrmEntity a una entidad de dominio Suplier.
   * 
   * @param ormEntity La entidad ORM SuplierOrmEntity a mapear.
   * @returns Una instancia de Suplier.
   */
  public static toDomainEntity(ormEntity: SuplierOrmEntity): SuplierEntity {
    // Crear el Value Object de dirección
    const addressVo = AddressEntity.create({
      street: ormEntity.address.street,
      externalNumber: ormEntity.address.externalNumber,
      internalNumber: ormEntity.address.internalNumber,
      municipality: ormEntity.address.municipality,
      neighborhood: ormEntity.address.neighborhood,
      city: ormEntity.address.city,
      state: ormEntity.address.state,
      postalCode: ormEntity.address.postalCode,
      country: ormEntity.address.country,
      reference: ormEntity.address.reference
    });

    // Crear el Value Object de nombre
    const nameVo = SuplierNameVO.create(ormEntity.name);
    const phoneNumberVo = SuplierPhoneNumberVO.create(ormEntity.phoneNumber);
    const contactPersonVo = ormEntity?.contactPerson? SuplierContactPersonVO.create(ormEntity?.contactPerson): null;
    const rfcVo = ormEntity.rfc? SuplierRFCVO.create(ormEntity.rfc): null;
    const emailVo = ormEntity.email? SuplierEmailVO.create(ormEntity.email): null;
    const notesVo = ormEntity.notes? SuplierNotesVO.create(ormEntity.notes): null;

    // Reconstituir la entidad de dominio
    return SuplierEntity.reconstitute(
      ormEntity.suplierId,
      nameVo,
      phoneNumberVo,
      addressVo,
      ormEntity.createdAt,
      rfcVo,
      contactPersonVo,
      emailVo,
      notesVo,
      ormEntity.updatedAt,
      ormEntity.deletedAt
    );
  }
}
