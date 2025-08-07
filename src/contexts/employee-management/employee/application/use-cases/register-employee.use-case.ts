// src/contexts/educational-center-management/educational-center/application/use-cases/register-educational-center.use-case.ts

import { RegisterEmployeeDto } from '../dtos/register-employee.dto';
import { EmployeeRepository } from '../../domain/repositories/employee.repository';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { EmployeeFirstNameVO } from '../../domain/values-objects/employee-first-name.vo';
import { EmployeeLastNameVO } from '../../domain/values-objects/employee-last-name.vo';
import { EmployeeEmailVO } from '../../domain/values-objects/employee-email.vo';
import { EmployeePhoneNumberVO } from '../../domain/values-objects/employee-phone-number.vo';
import { EmployeeBirthDateVO } from '../../domain/values-objects/employee-birth-date.vo';
import { GenderEnum } from '../../domain/enums/gender.enum';
import { EmployeeHireDateVO } from '../../domain/values-objects/employee-hire-date.vo';
import { EmployeeTerminationDateVO } from '../../domain/values-objects/employee-termination-date.vo';
import { EmployeeCurrentSalaryVO } from '../../domain/values-objects/employee-current-salary.vo';
import { AddressEntity } from 'src/shared/domain/value-objects/address.vo';
import { EmployeeRoleChekerPort } from 'src/contexts/employee-management/employee-role/domain/ports/out/employee-role-checker.port';
import { BranchOfficeCheckerPort } from 'src/contexts/establishment-management/branch-office/domain/ports/out/branch-office-checker.port';
import { EmployeeNotFoundException } from '../../domain/exceptions/employee-not-found.exception';


/**
 * RegisterEstablishmentUseCase es un Caso de Uso (o Servicio de Aplicación).
 * Contiene la lógica de orquestación para el proceso de registro de un establesimiento.
 * No contiene lógica de negocio pura, sino que coordina a las entidades de dominio y repositorios.
 */
export class RegisterEmployeeRoleUseCase {
  constructor(
    // Inyectamos la interfaz del repositorio, no una implementación concreta.
    // Esto es Inversión de Dependencias.
    private readonly employeeRoleRepository: EmployeeRepository,
    private readonly employeeRoleCheckerPort: EmployeeRoleChekerPort,
    private readonly branchOfficeCheckerPort: BranchOfficeCheckerPort,
  ) {}

  /**
   * Ejecuta el caso de uso para registrar un nuevo establesimiento.
   *
   * @param command El DTO que contiene los datos para el registro.
   * @returns Una Promesa que se resuelve con la entidad Establishment creada.
   * @throws Error si el nombre no es válido (validación del Value Object Name).
   */
  public async execute(command: RegisterEmployeeDto): Promise<EmployeeEntity> {

    // 0. Validar que el branch office y el employee role existen
    const branchOfficeExists = await this.branchOfficeCheckerPort.exists(command.branchOfficeId);
    const employeeRoleExists = await this.employeeRoleCheckerPort.exists(command.employeeRoleId);

    if (!branchOfficeExists) {
      throw new EmployeeNotFoundException(`La sucursal con el id ${command.branchOfficeId} no fue encontrada`);
    }

    if (!employeeRoleExists) {
      throw new EmployeeNotFoundException(`El rol de empleado con ID ${command.employeeRoleId} no fue encontrado`);
    }

    // 1. Crear value objects y address
    const firstName = EmployeeFirstNameVO.create(command.firstName);
    const lastName = EmployeeLastNameVO.create(command.lastName);
    const email = EmployeeEmailVO.create(command.email);
    const phoneNumber = EmployeePhoneNumberVO.create(command.phoneNumber);
    const birthDate = EmployeeBirthDateVO.create(command.birthDate ?? undefined);
    const gender = command.gender as GenderEnum ?? null;
    const hireDate = EmployeeHireDateVO.create(command.hireDate);
    const terminationDate = EmployeeTerminationDateVO.create(command.terminationDate ?? undefined);
    const currentSalary = EmployeeCurrentSalaryVO.create(Number(command.currentSalary));
    const address = AddressEntity.create({
      street: command.address.street,
      externalNumber: command.address.externalNumber,
      internalNumber: command.address.internalNumber ?? null,
      neighborhood: command.address.neighborhood,
      municipality: command.address.municipality,
      city: command.address.city,
      state: command.address.state,
      postalCode: command.address.postalCode,
      country: command.address.country,
      reference: command.address.reference ?? null,
    });

    // 2. Generar un nuevo ID para el empleado
    const newEmployeeId = BigInt(Date.now());

    // 3. Crear la entidad de dominio EmployeeEntity
    const employee = EmployeeEntity.create(
      newEmployeeId,
      command.employeeRoleId,
      command.branchOfficeId,
      firstName,
      lastName,
      email,
      BigInt(0), // addressId se asignará tras persistir (cascade)
      phoneNumber,
      birthDate,
      gender,
      hireDate,
      terminationDate,
      command.entryTime ?? '',
      command.exitTime ?? '',
      command.photoUrl ?? '',
      currentSalary,
    );
    // Asignar address en memoria (cascade)
    (employee as any)._address = address;

    // 4. Persistir el empleado (y address en cascada)
    const savedEntity = await this.employeeRoleRepository.save(employee);

    // 5. Despachar eventos de dominio si aplica
    const domainEvents = employee.getAndClearEvents();
    // ...removed console.log...

    return savedEntity;
  }
}