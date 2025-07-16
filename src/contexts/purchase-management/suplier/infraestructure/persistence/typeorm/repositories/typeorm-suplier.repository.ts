import { BranchOfficeEntity } from "src/contexts/establishment-management/branch-office/domain/entities/branch-office.entity";
import { AddressOrmEntity } from "src/shared/infraestructure/typeorm/address.orm-entity";
import { DataSource, Repository } from "typeorm";
import { SuplierOrmEntity } from "../entities/suplier.orm-entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { SuplierMapper } from "../mappers/suplier.mapper";
import { EstablishmentOrmEntity } from "src/contexts/establishment-management/establishment/infraestruture/persistence/typeorm/entities/establishment-orm-entity";
import { SuplierRepository } from "src/contexts/purchase-management/suplier/domain/repositories/suplier.repository";
import { SuplierEntity } from "src/contexts/purchase-management/suplier/domain/entities/suplier.entity";

@Injectable()
export class TypeOrmSuplierRepository implements SuplierRepository {
  private ormBranchOfficeRepository: Repository<SuplierOrmEntity>;
  // Ya no necesitamos ormAddressRepository aquí, TypeORM lo maneja con cascade

  constructor(private readonly dataSource: DataSource) {
    this.ormBranchOfficeRepository = this.dataSource.getRepository(SuplierOrmEntity);
  }

  async save(suplierEntity: SuplierEntity): Promise<SuplierEntity> {

    let addressOrmEntity: AddressOrmEntity | null = null;
    if (suplierEntity.suplierId) {
      // Intentamos cargar la entidad ORM existente para BranchOffice
      const existingBranchOrm = await this.ormBranchOfficeRepository.findOne({
        where: { suplierId: suplierEntity.suplierId },
        relations: ['address'], // Necesitamos cargar la dirección para actualizarla
      });
      if (existingBranchOrm) {
        addressOrmEntity = existingBranchOrm.address;
      }
    }

    if (!addressOrmEntity) {
      addressOrmEntity = new AddressOrmEntity();
    }

  
    // Conversion de una entidad de dominio a una entidad de Typeorm
    const branchOrmEntity = SuplierMapper.toOrmEntity(suplierEntity);
    
    
    // Guardar la entidad
    const resp = await this.ormBranchOfficeRepository.save(branchOrmEntity); // El cascade se encargará de guardar/actualizar la dirección
    
    // Convertir una entidad de Typeorm a una entidad de dominio
    const entity = SuplierMapper.toDomainEntity(resp);

    return entity;
  }

  async findById(id: bigint): Promise<SuplierEntity | null> {
    const suplierOrmEntity = await this.ormBranchOfficeRepository.findOne({
      where: { suplierId: id },
      relations: ['address'], // 'eager: true' en la entidad ya debería cargarla, pero es buena práctica indicarlo
    });

    if (!suplierOrmEntity) {
      return null;
    }

    const suplierEntity = SuplierMapper.toDomainEntity(suplierOrmEntity);
    return suplierEntity;
  }

  delete(entityId: bigint): Promise<SuplierEntity | null> {
    throw new Error('Este metodo no esta implementado');
  }
  
  findAll(): Promise<[] | SuplierEntity[]> {
    throw new Error('Este metodo no esta implementado');
  }

  async findByEmail(email: string): Promise<SuplierEntity | null> {
    const result = await this.ormBranchOfficeRepository.findOneBy({email});
    if(!result){
      return null;
    }
    return SuplierMapper.toDomainEntity(result);
  }

  async findByRfc(rfc: string): Promise<SuplierEntity | null> {
    const result = await this.ormBranchOfficeRepository.findOneBy({rfc});
    if(!result){
      return null;
    }
    return SuplierMapper.toDomainEntity(result);
  }
}