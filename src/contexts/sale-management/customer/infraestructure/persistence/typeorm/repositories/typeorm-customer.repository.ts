import { AddressOrmEntity } from "src/shared/infraestructure/typeorm/address.orm-entity";
import { DataSource, Repository } from "typeorm";
import { CustomerOrmEntity } from "../entities/customer.orm-entity";
import { Injectable } from "@nestjs/common";
import { CustomerMapper } from "../mappers/customer.mapper";
import { CustomerRepository } from "src/contexts/sale-management/customer/domain/repositories/customer.repository";
import { CustomerEntity } from "src/contexts/sale-management/customer/domain/entities/customer.entity";

@Injectable()
export class TypeOrmCustomerRepository implements CustomerRepository {
  private ormCustomerRepository: Repository<CustomerOrmEntity>;
  // Ya no necesitamos ormAddressRepository aquí, TypeORM lo maneja con cascade

  constructor(private readonly dataSource: DataSource) {
    this.ormCustomerRepository = this.dataSource.getRepository(CustomerOrmEntity);
  }

  async save(customerEntity: CustomerEntity): Promise<CustomerEntity> {

    let addressOrmEntity: AddressOrmEntity | null| undefined;

    if (customerEntity.address) {
      // Intentamos cargar la entidad ORM existente para BranchOffice
      const existingCustomerOrm = await this.ormCustomerRepository.findOne({
        where: { customerId: customerEntity.customerId },
        relations: ['address'], // Necesitamos cargar la dirección para actualizarla
      });
      if (existingCustomerOrm) {
        addressOrmEntity = existingCustomerOrm.address;
      }
    }

    if (!addressOrmEntity) {
      addressOrmEntity = new AddressOrmEntity();
    }

  
    // Conversion de una entidad de dominio a una entidad de Typeorm
    const branchOrmEntity = CustomerMapper.toOrmEntity(customerEntity);
    
    
    // Guardar la entidad
    const resp = await this.ormCustomerRepository.save(branchOrmEntity); // El cascade se encargará de guardar/actualizar la dirección
    
    // Convertir una entidad de Typeorm a una entidad de dominio
    const entity = CustomerMapper.toDomainEntity(resp);

    return entity;
  }

  async findById(id: bigint): Promise<CustomerEntity | null> {
    const customerOrmEntity = await this.ormCustomerRepository.findOne({
      where: { customerId: id },
      relations: ['address'], // 'eager: true' en la entidad ya debería cargarla, pero es buena práctica indicarlo
    });

    if (!customerOrmEntity) {
      return null;
    }

    const customerEntity = CustomerMapper.toDomainEntity(customerOrmEntity);
    return customerEntity;
  }

  delete(entityId: bigint): Promise<CustomerEntity | null> {
    throw new Error('Este metodo no esta implementado');
  }
  
  findAll(): Promise<[] | CustomerEntity[]> {
    throw new Error('Este metodo no esta implementado');
  }

  async findByEmail(email: string): Promise<CustomerEntity | null> {
    const result = await this.ormCustomerRepository.findOneBy({email});
    if(!result){
      return null;
    }
    return CustomerMapper.toDomainEntity(result);
  }

  async findByRfc(rfc: string): Promise<CustomerEntity | null> {
    const result = await this.ormCustomerRepository.findOneBy({rfc});
    if(!result){
      return null;
    }
    return CustomerMapper.toDomainEntity(result);
  }
}