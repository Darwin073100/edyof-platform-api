import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";
import { BranchOfficeResponseDto } from "../dtos/branch-office-response.dto";

/**
 * BranchOfficeMapper es una clase que se encarga de transformar
 * la entidad de dominio BranchOffice en un DTO de respuesta
 * apto para la capa de presentación.
 *
 * Los mappers son esenciales para evitar que la capa de presentación
 * dependa directamente de los objetos de dominio.
 */
export class BranchOfficeMapper {
    /**
     * Convierte una entidad de dominio BranchOffice a un DTO de respuesta.
     *
     * @param entity La entidad BranchOffice a mapear.
     * @returns Un BranchOfficeResponseDto.
     */
    public static toResponseDto(entity: BranchOfficeEntity): BranchOfficeResponseDto {
      return new BranchOfficeResponseDto(
        entity.branchOfficeId,
        entity.establishmentId,
        entity.name.value,
        {
          street: entity.address.street,
          externalNumber: entity.address.externalNumber,
          internalNumber: entity.address.internalNumber,
          municipality: entity.address.municipality,
          neighborhood: entity.address.neighborhood,
          city: entity.address.city,
          state: entity.address.state,
          postalCode: entity.address.postalCode,
          country: entity.address.country,
          reference: entity.address.reference
        },
        entity.createdAt,
        entity.updatedAt,
        entity.deletedAt,
      );
    }
}