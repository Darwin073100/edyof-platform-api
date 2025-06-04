import { BranchOffice } from "src/contexts/establishment-management/branch-office/domain/entities/branch-office.entity";
import { AddressOrmEntity } from "src/shared/infraestructure/typeorm/address.orm-entity";
import { DataSource, Repository } from "typeorm";
import { BranchOfficeOrmEntity } from "../entities/branch-office.orm-entity";
import { BranchOfficeRepository } from "src/contexts/establishment-management/branch-office/domain/repositories/branch-office.repository";
import { Injectable } from "@nestjs/common";
import { Name } from "src/contexts/establishment-management/establishment/domain/values-objects/name.vo";
import { Address } from "src/shared/domain/value-objects/address.vo";

@Injectable()
export class TypeOrmBranchOfficeRepository implements BranchOfficeRepository {
  private 
  ormBranchOfficeRepository: Repository<BranchOfficeOrmEntity>;
  // Ya no necesitamos ormAddressRepository aquí, TypeORM lo maneja con cascade

  constructor(private readonly dataSource: DataSource) {
    this.ormBranchOfficeRepository = this.dataSource.getRepository(BranchOfficeOrmEntity);
  }

  async save(branchOffice: BranchOffice): Promise<BranchOffice> {
    // 1. Mapear el Value Object de dominio Address a AddressOrmEntity
    // Si la BranchOffice ya existe (tiene un ID), su AddressOrmEntity asociada
    // debería haber sido cargada por 'eager: true'.
    // Si es una nueva BranchOffice, se crea una nueva AddressOrmEntity.
    let addressOrmEntity: AddressOrmEntity | null = null;
    if (branchOffice.branchOfficeId) {
      // Intentamos cargar la entidad ORM existente para BranchOffice
      const existingBranchOrm = await this.ormBranchOfficeRepository.findOne({
        where: { branchOfficeId: branchOffice.branchOfficeId },
        relations: ['address'], // Necesitamos cargar la dirección para actualizarla
      });
      if (existingBranchOrm) {
        addressOrmEntity = existingBranchOrm.address;
      }
    }

    if (!addressOrmEntity) {
      addressOrmEntity = new AddressOrmEntity();
    }

    // Actualizar las propiedades de la AddressOrmEntity con los valores del Address VO
    addressOrmEntity.street = branchOffice.address.street;
    addressOrmEntity.externalNumber = branchOffice.address.externalNumber;
    addressOrmEntity.internalNumber = branchOffice.address.internalNumber;
    addressOrmEntity.district = branchOffice.address.district;
    addressOrmEntity.city = branchOffice.address.city;
    addressOrmEntity.state = branchOffice.address.state;
    addressOrmEntity.postalCode = branchOffice.address.postalCode;
    addressOrmEntity.country = branchOffice.address.country;
    addressOrmEntity.reference = branchOffice.address.reference;

    // 2. Mapear la entidad de dominio BranchOffice a BranchOfficeOrmEntity
    // Utilizamos create() para crear una nueva instancia si es una nueva entidad,
    // o merge() para actualizar una existente.
    const branchOrmEntity = this.ormBranchOfficeRepository.create({
      branchOfficeId: branchOffice.branchOfficeId,
      name: branchOffice.name.value,
      establishmentId: branchOffice.establishmentId,
      createdAt: branchOffice.createdAt,
      updatedAt: branchOffice.updatedAt,
      deletedAt: branchOffice.deletedAt,
      address: addressOrmEntity, // ¡Asignamos la entidad ORM de la dirección!
      // No necesitamos manejar addressId directamente; TypeORM lo hará con la relación.
    });

    const resp = await this.ormBranchOfficeRepository.save(branchOrmEntity); // El cascade se encargará de guardar/actualizar la dirección
    const addressVO = Address.create({
      city: resp.address.city,
      country: resp.address.country,
      district: resp.address.district,
      externalNumber: resp.address.externalNumber,
      internalNumber: resp.address.internalNumber,
      postalCode: resp.address.postalCode,
      state: resp.address.state,
      street: resp.address.street,
      reference: resp.address.reference
    });
    const entity = BranchOffice.reconstitute(
      resp.branchOfficeId,
      Name.create(resp.name),
      addressVO, 
      resp.establishmentId,
      resp.createdAt,
      resp.updatedAt,
      resp.deletedAt
    );
    return entity;
  }

  async findById(id: bigint): Promise<BranchOffice | null> {
    const branchOrmEntity = await this.ormBranchOfficeRepository.findOne({
      where: { branchOfficeId: id },
      relations: ['address'], // 'eager: true' en la entidad ya debería cargarla, pero es buena práctica indicarlo
    });

    if (!branchOrmEntity) {
      return null;
    }

    // Reconstituir el Value Object de dominio Address desde AddressOrmEntity
    const addressVo = Address.reconstitute({
      street: branchOrmEntity.address.street,
      externalNumber: branchOrmEntity.address.externalNumber,
      internalNumber: branchOrmEntity.address.internalNumber,
      district: branchOrmEntity.address.district,
      city: branchOrmEntity.address.city,
      state: branchOrmEntity.address.state,
      postalCode: branchOrmEntity.address.postalCode,
      country: branchOrmEntity.address.country,
      reference: branchOrmEntity.address.reference,
    });

    const nameVo = Name.create(branchOrmEntity.name);

    return BranchOffice.reconstitute(
      branchOrmEntity.branchOfficeId,
      nameVo,
      addressVo,
      branchOrmEntity.establishmentId,
      branchOrmEntity.createdAt,
      branchOrmEntity.updatedAt,
      branchOrmEntity.deletedAt,
    );
  }
}