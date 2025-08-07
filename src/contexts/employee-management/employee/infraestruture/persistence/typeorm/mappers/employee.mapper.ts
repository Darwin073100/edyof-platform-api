import { EmployeeEntity } from "src/contexts/employee-management/employee/domain/entities/employee.entity";
import { EmployeeOrmEntity } from "../entities/employee-orm-entity";
import { EmployeeFirstNameVO } from "src/contexts/employee-management/employee/domain/values-objects/employee-first-name.vo";
import { EmployeeLastNameVO } from "src/contexts/employee-management/employee/domain/values-objects/employee-last-name.vo";
import { EmployeeEmailVO } from "src/contexts/employee-management/employee/domain/values-objects/employee-email.vo";
import { EmployeePhoneNumberVO } from "src/contexts/employee-management/employee/domain/values-objects/employee-phone-number.vo";
import { EmployeeBirthDateVO } from "src/contexts/employee-management/employee/domain/values-objects/employee-birth-date.vo";
import { EmployeeHireDateVO } from "src/contexts/employee-management/employee/domain/values-objects/employee-hire-date.vo";
import { EmployeeTerminationDateVO } from "src/contexts/employee-management/employee/domain/values-objects/employee-termination-date.vo";
import { EmployeeCurrentSalaryVO } from "src/contexts/employee-management/employee/domain/values-objects/employee-current-salary.vo";
import { GenderEnum } from "src/contexts/employee-management/employee/domain/enums/gender.enum";
import { BranchOfficeMapper } from "src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/mappers/branch-office.mapper";
import { EmployeeRoleMapper } from "src/contexts/employee-management/employee-role/infraestruture/persistence/typeorm/mappers/employee-role.mapper";
import { AddressEntity } from "src/shared/domain/value-objects/address.vo";
import { AddressOrmEntity } from "src/shared/infraestructure/typeorm/address.orm-entity";

export class EmployeeMapper {
  static toOrmEntity(domainEntity: EmployeeEntity): EmployeeOrmEntity {
    const orm = new EmployeeOrmEntity();
    orm.employeeId = domainEntity.employeeId;
    orm.branchOfficeId = domainEntity.branchOfficeId;
    orm.employeeRoleId = domainEntity.employeeRoleId;
    orm.addressId = domainEntity.addressId ?? null;
    orm.branchOffice = domainEntity.branchOffice ? BranchOfficeMapper.toOrmEntity(domainEntity.branchOffice) : undefined;
    orm.employeeRole = domainEntity.employeeRole ? EmployeeRoleMapper.toOrmEntity(domainEntity.employeeRole) : undefined;
    orm.address = domainEntity.address ? EmployeeMapper.addressToOrm(domainEntity.address) : null;
    orm.firstName = domainEntity.firstName.value ?? '';
    orm.lastName = domainEntity.lastName.value;
    orm.email = domainEntity.email.value;
    orm.phoneNumber = domainEntity.phoneNumber? domainEntity.phoneNumber?.value: null;
    orm.birthDate = domainEntity.birthDate ? domainEntity.birthDate.value: null;
    orm.gender = domainEntity.gender ?? null;
    orm.hireDate = domainEntity.hireDate ? domainEntity.hireDate.value: new Date();
    orm.terminationDate = domainEntity?.terminationDate ? domainEntity?.terminationDate?.value : null;
    orm.entryTime = domainEntity.entryTime;
    orm.exitTime = domainEntity.exitTime;
    orm.currentSalary = domainEntity["currentSalary"] ? domainEntity["currentSalary"].value : 0;
    orm.isActive = domainEntity.isActive;
    orm.photoUrl = domainEntity.photoUrl;
    orm.createdAt = domainEntity.createdAt;
    orm.updatedAt = domainEntity.updatedAt;
    orm.deletedAt = domainEntity.deletedAt;
    return orm;
  }

  static toDomainEntity(orm: EmployeeOrmEntity): EmployeeEntity {
    return EmployeeEntity.reconstitute(
      orm.employeeId,
      orm.employeeRoleId,
      orm.branchOfficeId,
      EmployeeFirstNameVO.create(orm.firstName),
      EmployeeLastNameVO.create(orm.lastName),
      EmployeeEmailVO.create(orm.email),
      orm.createdAt,
      orm.addressId ?? BigInt(0),
      orm.phoneNumber? EmployeePhoneNumberVO.create(orm?.phoneNumber): null,
      EmployeeBirthDateVO.create(orm.birthDate ?? undefined),
      orm.gender ?? GenderEnum.OTHER,
      EmployeeHireDateVO.create(orm.hireDate),
      EmployeeTerminationDateVO.create(orm.terminationDate ?? undefined),
      orm.entryTime ?? '',
      orm.exitTime ?? '',
      orm.isActive,
      orm.photoUrl ?? '',
      EmployeeCurrentSalaryVO.create(Number(orm.currentSalary)),
      orm.updatedAt,
      orm.deletedAt,
      orm.employeeRole ? EmployeeRoleMapper.toDomainEntity(orm.employeeRole) : undefined,
      orm.branchOffice ? BranchOfficeMapper.toDomainEntity(orm.branchOffice) : undefined,
      orm.address ? EmployeeMapper.addressToDomain(orm.address) : undefined,
    );
  }

  private static addressToOrm(address: AddressEntity): AddressOrmEntity {
    const orm = new AddressOrmEntity();
    orm.street = address.street;
    orm.externalNumber = address.externalNumber;
    orm.internalNumber = address.internalNumber;
    orm.municipality = address.municipality;
    orm.neighborhood = address.neighborhood;
    orm.city = address.city;
    orm.state = address.state;
    orm.postalCode = address.postalCode;
    orm.country = address.country;
    orm.reference = address.reference;
    return orm;
  }

  private static addressToDomain(addressOrm: AddressOrmEntity): AddressEntity {
    return AddressEntity.create({
      street: addressOrm.street,
      externalNumber: addressOrm.externalNumber,
      internalNumber: addressOrm.internalNumber,
      neighborhood: addressOrm.neighborhood,
      municipality: addressOrm.municipality,
      city: addressOrm.city,
      state: addressOrm.state,
      postalCode: addressOrm.postalCode,
      country: addressOrm.country,
      reference: addressOrm.reference
    });
  }
}