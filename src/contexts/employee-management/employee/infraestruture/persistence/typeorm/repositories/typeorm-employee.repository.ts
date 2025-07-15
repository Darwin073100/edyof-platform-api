// src/contexts/educational-center-management/educational-center/infrastructure/persistence/typeorm/repositories/typeorm-educational-center.repository.ts

import { InjectRepository } from '@nestjs/typeorm'; // Decoradores de NestJS para inyección
import { Injectable } from '@nestjs/common'; // Decorador de NestJS para hacer la clase inyectable
import { EmployeeOrmEntity } from '../entities/employee-orm-entity';
import { QueryFailedError, Repository } from 'typeorm';
import { EmployeeRoleRepository } from 'src/contexts/employee-management/employee-role/domain/repositories/employee-role.repository';
import { EmployeeRoleEntity } from 'src/contexts/employee-management/employee-role/domain/entities/employee-role.entity';
import { EmployeeRoleNameVO } from 'src/contexts/employee-management/employee-role/domain/values-objects/employee-role-name.vo';
import { EmployeeRoleAlreadyExistsException } from 'src/contexts/employee-management/employee-role/domain/exceptions/employee-role-already-exists.exception';
import { EmployeeEntity } from 'src/contexts/employee-management/employee/domain/entities/employee.entity';
import { EmployeeRepository } from 'src/contexts/employee-management/employee/domain/repositories/employee.repository';
import { EmployeeMapper } from '../mappers/employee.mapper';
import { EmployeeAlreadyExistsException } from 'src/contexts/employee-management/employee/domain/exceptions/employee-already-exists.exception';
import { InvalidEmployeeException } from 'src/contexts/employee-management/employee/domain/exceptions/invalid-employee.exception';
/**
 * TypeOrmEducationalCenterRepository es la implementación concreta de la interfaz
 * EducationalCenterRepository. Es parte de la capa de infraestructura y se encarga
 * de la persistencia de los objetos EducationalCenter utilizando TypeORM.
 *
 * Actúa como un adaptador entre el dominio puro y el ORM.
 */
@Injectable() // Hace que esta clase sea inyectable por el sistema de inyección de dependencias de NestJS
export class TypeOrmBrandRepository implements EmployeeRepository {
  private readonly typeOrmRepository: Repository<EmployeeOrmEntity>;

  constructor(
    @InjectRepository(EmployeeOrmEntity) // Inyecta el repositorio de TypeORM para EducationalCenterOrmEntity
    typeOrmRepository: Repository<EmployeeOrmEntity>,
  ) {
    this.typeOrmRepository = typeOrmRepository;
  }

  /**
   * Guarda o actualiza un centro educativo en la base de datos.
   * Realiza la conversión entre la entidad de dominio y la entidad ORM.
   *
   * @param employeeRole La instancia de EducationalCenter a guardar.
   */
  async save(employee: EmployeeEntity): Promise<EmployeeEntity> {
    try {
      let ormEntity = await this.typeOrmRepository.findOne({
        where: { employeeId: employee.employeeId as any },
      });

      if (ormEntity) {
        // Actualizar entidad existente usando el mapper
        const updatedOrm = EmployeeMapper.toOrmEntity(employee);
        // Conserva el ID original
        updatedOrm.employeeId = ormEntity.employeeId;
        ormEntity = Object.assign(ormEntity, updatedOrm);
      } else {
        // Crear nueva entidad usando el mapper
        ormEntity = EmployeeMapper.toOrmEntity(employee);
      }

      const savedOrmEntity = await this.typeOrmRepository.save(ormEntity);
      return EmployeeMapper.toDomainEntity(savedOrmEntity);
    } catch (error) {
      if(error instanceof QueryFailedError){
        const pgError = error as any;
        if(pgError.code === '23505'){
          throw new EmployeeAlreadyExistsException('Ya existe un empleado con ese email.');
        }
        // Manejo específico para error de enum gender
      if (
        error.name === 'QueryFailedError' &&
        error.message &&
        error.message.includes('invalid input value for enum employee_gender_enum')
      ) {
        throw new InvalidEmployeeException(
          'El género debe ser: masculino, femenino, otro.'
        );
      }
      }
      throw error;
    }
  }

  /**
   * Busca un centro educativo por su ID en la base de datos.
   * Realiza la conversión de la entidad ORM a la entidad de dominio.
   *
   * @param id El ID del centro educativo.
   * @returns Una Promesa que se resuelve con la instancia de EducationalCenter
   * si se encuentra, o `null` si no existe.
   */
  async findById(id: bigint): Promise<EmployeeEntity | null> {
    // 1. Buscar la entidad ORM en la base de datos.
    const ormEntity = await this.typeOrmRepository.findOne({
      where: { employeeId: id as any }, // TypeORM y BigInt
    });

    if (!ormEntity) {
      return null;
    }

    // 2. Reconstituir la entidad de dominio desde la entidad ORM.
    // Usamos el método de fábrica 'reconstitute' para crear la entidad de dominio
    // a partir de datos ya existentes, sin emitir eventos de dominio.
    return EmployeeMapper.toDomainEntity(ormEntity);
  }

  delete(entityId: bigint): Promise<EmployeeEntity | null> {
    throw new Error('Este metodo no está implementado.');
  }

  findAll(): Promise<EmployeeEntity[]> {
    throw new Error('Este metodo no esta implementado.');
  }
}