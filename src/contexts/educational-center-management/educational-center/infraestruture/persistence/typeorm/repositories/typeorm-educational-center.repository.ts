// src/contexts/educational-center-management/educational-center/infrastructure/persistence/typeorm/repositories/typeorm-educational-center.repository.ts

import { InjectRepository } from '@nestjs/typeorm'; // Decoradores de NestJS para inyección
import { Injectable } from '@nestjs/common'; // Decorador de NestJS para hacer la clase inyectable
import { EstablishmentOrmEntity } from '../entities/establishment-orm-entity';
import { Name } from 'src/contexts/educational-center-management/educational-center/domain/values-objects/name.vo';
import { EstablishmentRepository } from 'src/contexts/educational-center-management/educational-center/domain/repositories/establishment.repository';
import { EstablishmentEntity } from 'src/contexts/educational-center-management/educational-center/domain/entities/establishment.entity';
import { Repository } from 'typeorm';

/**
 * TypeOrmEducationalCenterRepository es la implementación concreta de la interfaz
 * EducationalCenterRepository. Es parte de la capa de infraestructura y se encarga
 * de la persistencia de los objetos EducationalCenter utilizando TypeORM.
 *
 * Actúa como un adaptador entre el dominio puro y el ORM.
 */
@Injectable() // Hace que esta clase sea inyectable por el sistema de inyección de dependencias de NestJS
export class TypeOrmEstablishmentRepository implements EstablishmentRepository {
  private readonly typeOrmRepository: Repository<EstablishmentOrmEntity>;

  constructor(
    @InjectRepository(EstablishmentOrmEntity) // Inyecta el repositorio de TypeORM para EducationalCenterOrmEntity
    typeOrmRepository: Repository<EstablishmentOrmEntity>,
  ) {
    this.typeOrmRepository = typeOrmRepository;
  }

  /**
   * Guarda o actualiza un centro educativo en la base de datos.
   * Realiza la conversión entre la entidad de dominio y la entidad ORM.
   *
   * @param establishment La instancia de EducationalCenter a guardar.
   */
  async save(establishment: EstablishmentEntity): Promise<EstablishmentEntity> {
    // 1. Convertir la entidad de dominio a la entidad ORM.
    // Usamos el ID del dominio si existe para una actualización,
    // o creamos una nueva entidad ORM si es una nueva inserción.
    let ormEntity = await this.typeOrmRepository.findOne({
      where: { establishmentId: establishment.establishmentId as any }, // TypeORM puede necesitar un cast para bigint en algunos casos
    });

    if (ormEntity) {
      // Actualizar entidad existente
      ormEntity.name = establishment.name.value;
      ormEntity.updatedAt = establishment.updatedAt;
      ormEntity.deletedAt = establishment.deletedAt;
    } else {
      // Crear nueva entidad
      ormEntity = this.typeOrmRepository.create({
        // NO asignamos el ID aquí si es autogenerado por la DB (bigserial).
        // TypeORM lo manejará automáticamente en la inserción.
        name: establishment.name.value,
        createdAt: establishment.createdAt,
        updatedAt: establishment.updatedAt,
        deletedAt: establishment.deletedAt,
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
    return EstablishmentEntity.reconstitute(
      savedOrmEntity.establishmentId,
      Name.create(savedOrmEntity.name), // Reconstruimos el Value Object Name
      savedOrmEntity.createdAt,
      savedOrmEntity.updatedAt,
      savedOrmEntity.deletedAt,
    );
  }

  /**
   * Busca un centro educativo por su ID en la base de datos.
   * Realiza la conversión de la entidad ORM a la entidad de dominio.
   *
   * @param id El ID del centro educativo.
   * @returns Una Promesa que se resuelve con la instancia de EducationalCenter
   * si se encuentra, o `null` si no existe.
   */
  async findById(id: bigint): Promise<EstablishmentEntity | null> {
    // 1. Buscar la entidad ORM en la base de datos.
    const ormEntity = await this.typeOrmRepository.findOne({
      where: { establishmentId: id as any }, // TypeORM y BigInt
    });

    if (!ormEntity) {
      return null;
    }

    // 2. Reconstituir la entidad de dominio desde la entidad ORM.
    // Usamos el método de fábrica 'reconstitute' para crear la entidad de dominio
    // a partir de datos ya existentes, sin emitir eventos de dominio.
    return EstablishmentEntity.reconstitute(
      ormEntity.establishmentId,
      Name.create(ormEntity.name), // Reconstruimos el Value Object Name
      ormEntity.createdAt,
      ormEntity.updatedAt,
      ormEntity.deletedAt,
    );
  }
}