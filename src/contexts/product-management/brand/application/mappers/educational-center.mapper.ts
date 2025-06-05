// src/contexts/educational-center-management/educational-center/application/mappers/educational-center.mapper.ts

import { BrandEntity } from '../../domain/entities/brand.entity';
import { BrandResponseDto } from '../dtos/brand-response.dto';

/**
 * EstablishmentMapper es una clase que se encarga de transformar
 * la entidad de dominio Establishment en un DTO de respuesta
 * apto para la capa de presentación.
 *
 * Los mappers son esenciales para evitar que la capa de presentación
 * dependa directamente de los objetos de dominio.
 */
export class BrandMapper {
  /**
   * Convierte una entidad de dominio Establishment a un DTO de respuesta.
   *
   * @param entity La entidad Establishment a mapear.
   * @returns Un EstablishmentResponseDto.
   */
  public static toResponseDto(entity: BrandEntity): BrandResponseDto {
    return new BrandResponseDto(
      entity.brandId.toString(), // Convertimos BigInt a string para la serialización JSON
      entity.name.value,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }

  // public static toResponseListDto(entities:EstablishmentEntity[]):{Establishments:EstablishmentResponseDto[]}{
  //   if(!entities) return {
  //     Establishments:[]
  //   };
  //   return {
  //     Establishments: entities.map(item => this.toResponseDto(item) )
  //   }
  // }

  // Si necesitamos mapear colecciones, podríamos tener:
  // public static toResponseDtos(entities: Establishment[]): EstablishmentResponseDto[] {
  //   return entities.map(entity => this.toResponseDto(entity));
  // }

  // Si en algún momento necesitamos convertir un DTO de entrada a una entidad de dominio,
  // también podríamos tener métodos como:
  // public static toDomainEntity(dto: RegisterEstablishmentDto): Establishment {
  //   // Esto es menos común ya que los casos de uso construyen las entidades
  //   // a partir de los DTOs y Value Objects.
  //   throw new Error('Not implemented: Conversion from DTO to Domain Entity often handled by Use Case.');
  // }
}