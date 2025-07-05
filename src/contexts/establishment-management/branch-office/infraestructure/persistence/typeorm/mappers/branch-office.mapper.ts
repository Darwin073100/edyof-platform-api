import { BranchOffice } from "src/contexts/establishment-management/branch-office/domain/entities/branch-office.entity";
import { BranchOfficeOrmEntity } from "../entities/branch-office.orm-entity";
import { AddressOrmEntity } from "src/shared/infraestructure/typeorm/address.orm-entity";

import { AddressEntity } from "src/shared/domain/value-objects/address.vo";
import { BranchOfficeNameVO } from "src/contexts/establishment-management/branch-office/domain/value-objects/branch-office-name.vo";

/**
 * BranchOfficeMapper es una clase que se encarga de transformar
 * entre la entidad de dominio BranchOffice y la entidad ORM BranchOfficeOrmEntity.
 * 
 * Este mapper es esencial para mantener la separación entre el dominio
 * y la capa de infraestructura, permitiendo que cada uno evolucione
 * de manera independiente.
 */
export class BranchOfficeMapper {
  /**
   * Convierte una entidad de dominio BranchOffice a una entidad ORM BranchOfficeOrmEntity.
   * 
   * @param domainEntity La entidad de dominio BranchOffice a mapear.
   * @returns Una instancia de BranchOfficeOrmEntity.
   */
  public static toOrmEntity(domainEntity: BranchOffice): BranchOfficeOrmEntity {
    const ormEntity = new BranchOfficeOrmEntity();
    
    // Mapear propiedades básicas
    ormEntity.branchOfficeId = domainEntity.branchOfficeId;
    ormEntity.name = domainEntity.name.value;
    ormEntity.establishmentId = domainEntity.establishmentId;
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
   * Convierte una entidad ORM BranchOfficeOrmEntity a una entidad de dominio BranchOffice.
   * 
   * @param ormEntity La entidad ORM BranchOfficeOrmEntity a mapear.
   * @returns Una instancia de BranchOffice.
   */
  public static toDomainEntity(ormEntity: BranchOfficeOrmEntity): BranchOffice {
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
    const nameVo = BranchOfficeNameVO.create(ormEntity.name);

    // Reconstituir la entidad de dominio
    return BranchOffice.reconstitute(
      ormEntity.branchOfficeId,
      nameVo,
      addressVo,
      ormEntity.establishmentId,
      ormEntity.createdAt,
      ormEntity.updatedAt,
      ormEntity.deletedAt
    );
  }
}
