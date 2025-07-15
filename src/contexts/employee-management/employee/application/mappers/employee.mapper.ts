// src/contexts/educational-center-management/educational-center/application/mappers/educational-center.mapper.ts

import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { EmployeeResponseDto } from '../dtos/employee-response.dto';

/**
 * EstablishmentMapper es una clase que se encarga de transformar
 * la entidad de dominio Establishment en un DTO de respuesta
 * apto para la capa de presentación.
 *
 * Los mappers son esenciales para evitar que la capa de presentación
 * dependa directamente de los objetos de dominio.
 */
export class EmployeeRoleMapper {
  /**
   * Convierte una entidad de dominio Establishment a un DTO de respuesta.
   *
   * @param entity La entidad Establishment a mapear.
   * @returns Un EstablishmentResponseDto.
   */
  public static toResponseDto(entity: EmployeeEntity): EmployeeResponseDto {
    return new EmployeeResponseDto(
      entity.employeeId,
      entity.branchOfficeId,
      entity.employeeRoleId,
      entity.addressId ? entity.addressId : null,
      entity.firstName.value ?? '',
      entity.lastName.value ?? '',
      entity.email.value ?? '',
      entity.phoneNumber.value ?? null,
      entity.birthDate.value ?? null,
      entity.gender ?? null,
      entity.hireDate.value!,
      entity.terminationDate.value ?? null,
      entity.entryTime ?? null,
      entity.exitTime ?? null,
      entity.currentSalary.value.toString(),
      entity.isActive,
      entity.photoUrl ?? null,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
      entity.address
        ? {
            street: entity.address.street ?? '',
            externalNumber: entity.address.externalNumber ?? '',
            internalNumber: entity.address.internalNumber ?? null,
            neighborhood: entity.address.neighborhood ?? '',
            municipality: entity.address.municipality ?? '',
            city: entity.address.city ?? '',
            state: entity.address.state ?? '',
            postalCode: entity.address.postalCode ?? '',
            country: entity.address.country ?? '',
            reference: entity.address.reference ?? null,
          }
        : null
    );
  }
}