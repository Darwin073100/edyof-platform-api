// src/contexts/educational-center-management/educational-center/infrastructure/persistence/typeorm/repositories/typeorm-educational-center.repository.ts

import { InjectRepository } from '@nestjs/typeorm'; // Decoradores de NestJS para inyección
import { Injectable } from '@nestjs/common'; // Decorador de NestJS para hacer la clase inyectable
import { BrandOrmEntity } from '../entities/brand-orm-entity';
import { Name } from 'src/contexts/establishment-management/establishment/domain/values-objects/name.vo';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { BrandRepository } from 'src/contexts/product-management/brand/domain/repositories/brand.repository';
import { BrandEntity } from 'src/contexts/product-management/brand/domain/entities/brand.entity';
import { BrandNameVO } from 'src/contexts/product-management/brand/domain/values-objects/brand-name.vo';
import { BrandAlreadyExistsException } from 'src/contexts/product-management/brand/domain/exceptions/brand-already-exists.exception';
import { BrandMapper } from '../mappers/brand.mapper';
import { BrandNotFoundException } from 'src/contexts/product-management/brand/domain/exceptions/brand-not-found.exception';

/**
 * TypeOrmEducationalCenterRepository es la implementación concreta de la interfaz
 * EducationalCenterRepository. Es parte de la capa de infraestructura y se encarga
 * de la persistencia de los objetos EducationalCenter utilizando TypeORM.
 *
 * Actúa como un adaptador entre el dominio puro y el ORM.
 */
@Injectable() // Hace que esta clase sea inyectable por el sistema de inyección de dependencias de NestJS
export class TypeOrmBrandRepository implements BrandRepository {
  private readonly typeOrmRepository: Repository<BrandOrmEntity>;

  constructor(
    readonly datasource: DataSource
  ) {
    this.typeOrmRepository = this.datasource.getRepository(BrandOrmEntity);
  }

  /**
   * Guarda o actualiza una marca en la base de datos.
   * Realiza la conversión entre la entidad de dominio y la entidad ORM.
   *
   * @param brand La instancia de Brand a guardar.
   */
  async save(brand: BrandEntity): Promise<BrandEntity> {
    try {
      let ormEntity = await this.typeOrmRepository.findOne({
        where: { brandId: brand.brandId as any }, // TypeORM puede necesitar un cast para bigint en algunos casos
      });

      if (ormEntity) {
        ormEntity.name = brand.name.value;
        ormEntity.updatedAt = brand.updatedAt;
        ormEntity.deletedAt = brand.deletedAt;
      } else {
        ormEntity = this.typeOrmRepository.create({
          name: brand.name.value,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt,
          deletedAt: brand.deletedAt,
        });
      }
      const savedOrmEntity = await this.typeOrmRepository.save(ormEntity);
      return BrandEntity.reconstitute(
        savedOrmEntity.brandId,
        BrandNameVO.create(savedOrmEntity.name), // Reconstruimos el Value Object Name
        savedOrmEntity.createdAt,
        savedOrmEntity.updatedAt,
        savedOrmEntity.deletedAt,
      );
    } catch (error) {
      if(error instanceof QueryFailedError){
        const pgError = error as any;
        if(pgError.code === '23505'){
          throw new BrandAlreadyExistsException('Ya existe una marca con ese nombre.');
        }
      }

      throw error;
    }
  }

  /**
   * Busca una marca por su ID en la base de datos.
   * Realiza la conversión de la entidad ORM a la entidad de dominio.
   *
   * @param id El ID dela marca.
   * @returns Una Promesa que se resuelve con la instancia de EducationalCenter
   * si se encuentra, o `null` si no existe.
   */
  async findById(id: bigint): Promise<BrandEntity | null> {
    // 1. Buscar la entidad ORM en la base de datos.
    const ormEntity = await this.typeOrmRepository.findOne({
      where: { brandId: id as any }, // TypeORM y BigInt
    });

    if (!ormEntity) {
      return null;
    }

    // 2. Reconstituir la entidad de dominio desde la entidad ORM.
    // Usamos el método de fábrica 'reconstitute' para crear la entidad de dominio
    // a partir de datos ya existentes, sin emitir eventos de dominio.
    return BrandEntity.reconstitute(
      ormEntity.brandId,
      BrandNameVO.create(ormEntity.name), // Reconstruimos el Value Object Name
      ormEntity.createdAt,
      ormEntity.updatedAt,
      ormEntity.deletedAt,
    );
  }

  //Eliminar una marca con softdelete y queryRunner
  async delete(entityId: bigint): Promise<BrandEntity | null> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const ormEntity = await queryRunner.manager.findOne(BrandOrmEntity, {
        where: { brandId: entityId },
      });

      if (!ormEntity) {
        throw new BrandNotFoundException('Marca no encontrada');
      }

      // Creacion y ejecución del script
      await queryRunner.manager.query(
        `update brand set deleted_at = now() 
        where brand_id=${entityId};`
      );
      await queryRunner.commitTransaction();

      return BrandMapper.toDomainEntity(ormEntity);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<[] | BrandEntity[]> {
    const result = await this.typeOrmRepository.find({
      where: {
        deletedAt: undefined
      },
      order: {
        name: 'ASC'
      }
    });
    const brandList = result.map(item => BrandMapper.toDomainEntity(item));
    return brandList;
  }
}