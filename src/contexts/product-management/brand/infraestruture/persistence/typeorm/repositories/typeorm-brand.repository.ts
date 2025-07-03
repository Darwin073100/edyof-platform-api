// src/contexts/educational-center-management/educational-center/infrastructure/persistence/typeorm/repositories/typeorm-educational-center.repository.ts

import { InjectRepository } from '@nestjs/typeorm'; // Decoradores de NestJS para inyección
import { Injectable } from '@nestjs/common'; // Decorador de NestJS para hacer la clase inyectable
import { BrandOrmEntity } from '../entities/brand-orm-entity';
import { Name } from 'src/contexts/establishment-management/establishment/domain/values-objects/name.vo';
import { QueryFailedError, Repository } from 'typeorm';
import { BrandRepository } from 'src/contexts/product-management/brand/domain/repositories/brand.repository';
import { BrandEntity } from 'src/contexts/product-management/brand/domain/entities/brand.entity';
import { BrandNameVO } from 'src/contexts/product-management/brand/domain/values-objects/brand-name.vo';
import { BrandAlreadyExistsException } from 'src/contexts/product-management/brand/domain/exceptions/brand-already-exists.exception';

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
    @InjectRepository(BrandOrmEntity) // Inyecta el repositorio de TypeORM para EducationalCenterOrmEntity
    typeOrmRepository: Repository<BrandOrmEntity>,
  ) {
    this.typeOrmRepository = typeOrmRepository;
  }

  /**
   * Guarda o actualiza un centro educativo en la base de datos.
   * Realiza la conversión entre la entidad de dominio y la entidad ORM.
   *
   * @param brand La instancia de EducationalCenter a guardar.
   */
  async save(brand: BrandEntity): Promise<BrandEntity> {
    try {
      // 1. Convertir la entidad de dominio a la entidad ORM.
      // Usamos el ID del dominio si existe para una actualización,
      // o creamos una nueva entidad ORM si es una nueva inserción.
      let ormEntity = await this.typeOrmRepository.findOne({
        where: { brandId: brand.brandId as any }, // TypeORM puede necesitar un cast para bigint en algunos casos
      });

      if (ormEntity) {
        // Actualizar entidad existente
        ormEntity.name = brand.name.value;
        ormEntity.updatedAt = brand.updatedAt;
        ormEntity.deletedAt = brand.deletedAt;
      } else {
        // Crear nueva entidad
        ormEntity = this.typeOrmRepository.create({
          // NO asignamos el ID aquí si es autogenerado por la DB (bigserial).
          // TypeORM lo manejará automáticamente en la inserción.
          name: brand.name.value,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt,
          deletedAt: brand.deletedAt,
        });
      }

      // 2. Persistir la entidad ORM en la base de datos.
      const savedOrmEntity = await this.typeOrmRepository.save(ormEntity);

      // 3. Opcional: Si el ID de la entidad de dominio es mutable o si necesitas el ID real
      // inmediatamente después de una inserción (para un nuevo agregado con ID autogenerado),
      // podrías "actualizar" la entidad de dominio con el ID real de la base de datos.
      // Sin embargo, para mantener la inmutabilidad de la entidad de dominio,
      // y dado que el caso de uso devuelve la instancia creada, el ID real será
      // conocido por la capa de aplicación/presentación al recuperar la entidad
      // o al procesar un evento de dominio si el ID real es parte del evento.
      // Para `bigserial`, el ID final solo se conocerá después del `save`.
      // Si necesitas el ID inmediatamente después de la creación, la respuesta del
      // caso de uso debería ser un DTO de salida que el repositorio pueda mapear y devolver.
      // Aquí el `void` en `save` significa que no se devuelve el agregado modificado.
      // Si necesitaras el ID, el método `save` del repositorio debería devolver `EducationalCenter`
      // y el caso de uso actualizaría su referencia.
      // 4. Reconstituir la entidad de dominio desde la entidad ORM.
      // Usamos el método de fábrica 'reconstitute' para crear la entidad de dominio
      // a partir de datos ya existentes, sin emitir eventos de dominio.
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
   * Busca un centro educativo por su ID en la base de datos.
   * Realiza la conversión de la entidad ORM a la entidad de dominio.
   *
   * @param id El ID del centro educativo.
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
}