import { DomainEvent } from "src/shared/domain/events/domain-events";
import { EmployeeFirstNameVO } from "../values-objects/employee-first-name.vo";
import { EmployeeRoleCreatedEvent } from "../events/employee-role-created.event";
import { ProductEntity } from "src/contexts/product-management/product/domain/entities/product.entity";
import { EmployeeRoleEntity } from "src/contexts/employee-management/employee-role/domain/entities/employee-role.entity";
import { EmployeeLastNameVO } from "../values-objects/employee-last-name.vo";
import { EmployeeEmailVO } from "../values-objects/employee-email.vo";
import { EmployeePhoneNumberVO } from "../values-objects/employee-phone-number.vo";
import { EmployeeBirthDateVO } from "../values-objects/employee-birth-date.vo";
import { GenderEnum } from "../enums/gender.enum";
import { EmployeeHireDateVO } from "../values-objects/employee-hire-date.vo";
import { EmployeeTerminationDateVO } from "../values-objects/employee-termination-date.vo";
import { BranchOffice } from "src/contexts/establishment-management/branch-office/domain/entities/branch-office.entity";
import { AddressEntity } from "src/shared/domain/value-objects/address.vo";
import { EmployeeCurrentSalaryVO } from "../values-objects/employee-current-salary.vo";

export class EmployeeEntity {
    private readonly _employeeId: bigint;
    private _employeeRoleId: bigint;
    private _branchOfficeId: bigint;
    private _addressId: bigint;
    private _firstName: EmployeeFirstNameVO;
    private _lastName: EmployeeLastNameVO;
    private _email: EmployeeEmailVO;
    private _phoneNumber: EmployeePhoneNumberVO;
    private _birthDate: EmployeeBirthDateVO;
    private _gender: GenderEnum;
    private _hireDate: EmployeeHireDateVO;
    private _terminationDate: EmployeeTerminationDateVO;
    private _entryTime: string;
    private _exitTime: string;
    private _isActive: boolean;
    private _photoUrl: string;
    private _currentSalary: EmployeeCurrentSalaryVO;
    private readonly _createdAt: Date;
    private _updatedAt: Date | null;
    private _deletedAt: Date | null;
    private _domainEvents: DomainEvent<this>[] = [];
    private _employeeRole?: EmployeeRoleEntity|null;
    private _branchOffice?: BranchOffice|null;
    private _address?: AddressEntity|null;

    private constructor(
    employeeId: bigint,
    employeeRoleId: bigint,
    branchOfficeId: bigint,
    addressId: bigint,
    firstName: EmployeeFirstNameVO,
    lastName: EmployeeLastNameVO,
    email: EmployeeEmailVO,
    phoneNumber: EmployeePhoneNumberVO,
    birthDate: EmployeeBirthDateVO,
    gender: GenderEnum,
    hireDate: EmployeeHireDateVO,
    terminationDate: EmployeeTerminationDateVO,
    entryTime: string,
    exitTime: string,
    isActive: boolean,
    photoUrl: string,
    currentSalary: EmployeeCurrentSalaryVO,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    employeeRole?: EmployeeRoleEntity | null,
    branchOffice?: BranchOffice|null,
    address?: AddressEntity|null,
    ) {
        this._employeeId = employeeId;
        this._employeeRoleId = employeeRoleId;
        this._addressId = addressId;
        this._branchOfficeId = branchOfficeId;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._birthDate = birthDate;
        this._gender = gender;
        this._hireDate = hireDate;
        this._terminationDate = terminationDate;
        this._entryTime = entryTime;
        this._exitTime = exitTime;
        this._isActive = isActive;
        this._photoUrl = photoUrl;
        this._currentSalary = currentSalary;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;
        this._branchOffice = branchOffice ?? undefined;
        this._address = address ?? undefined;
        this._employeeRole = employeeRole ?? undefined;
    }

    /**
     * Crea una nueva instancia de EmployeeEntity.
     * Este es un método de fábrica para asegurar la creación controlada del agregado.
     * Un evento de dominio EmployeeRoleCreatedEvent se registra internamente.
     *
     * @returns Una nueva instancia de EmployeeEntity.
     */
    static create(
        employeeId: bigint,
        employeeRoleId: bigint,
        branchOfficeId: bigint,
        addressId: bigint,
        firstName: EmployeeFirstNameVO,
        lastName: EmployeeLastNameVO,
        email: EmployeeEmailVO,
        phoneNumber: EmployeePhoneNumberVO,
        birthDate: EmployeeBirthDateVO,
        gender: GenderEnum,
        hireDate: EmployeeHireDateVO,
        terminationDate: EmployeeTerminationDateVO,
        entryTime: string,
        exitTime: string,
        photoUrl: string,
        currentSalary: EmployeeCurrentSalaryVO,
        createdAt: Date,
    ): EmployeeEntity {
        const employee = new EmployeeEntity(
            employeeId,
            employeeRoleId,
            branchOfficeId,
            addressId,
            firstName,
            lastName,
            email,
            phoneNumber,
            birthDate,
            gender,
            hireDate,
            terminationDate,
            entryTime,
            exitTime,
            true,
            photoUrl,
            currentSalary,
            createdAt,
            null,
            null,
            null,
            null,
            null
        );
        // Registrar evento de dominio si aplica (ejemplo: EmployeeCreatedEvent)
        // employee.recordEvent(new EmployeeCreatedEvent(employee));
        return employee;
    }

    /**
     * Reconstituye una instancia de EmployeeEntity desde la persistencia.
     * No emite eventos ya que representa un estado ya existente.
     */
    static reconstitute(
        employeeId: bigint,
        employeeRoleId: bigint,
        branchOfficeId: bigint,
        addressId: bigint,
        firstName: EmployeeFirstNameVO,
        lastName: EmployeeLastNameVO,
        email: EmployeeEmailVO,
        phoneNumber: EmployeePhoneNumberVO,
        birthDate: EmployeeBirthDateVO,
        gender: GenderEnum,
        hireDate: EmployeeHireDateVO,
        terminationDate: EmployeeTerminationDateVO,
        entryTime: string,
        exitTime: string,
        isActive: boolean,
        photoUrl: string,
        currentSalary: EmployeeCurrentSalaryVO,
        createdAt: Date,
        updatedAt: Date | null = null,
        deletedAt: Date | null = null,
        employeeRole?: EmployeeRoleEntity | null,
        branchOffice?: BranchOffice | null,
        address?: AddressEntity | null,
    ): EmployeeEntity {
        return new EmployeeEntity(
            employeeId,
            employeeRoleId,
            branchOfficeId,
            addressId,
            firstName,
            lastName,
            email,
            phoneNumber,
            birthDate,
            gender,
            hireDate,
            terminationDate,
            entryTime,
            exitTime,
            isActive,
            photoUrl,
            currentSalary,
            createdAt,
            updatedAt,
            deletedAt,
            employeeRole,
            branchOffice,
            address
        );
    }

    // Getters
    get employeeId(): bigint {
        return this._employeeId;
    }
    get employeeRoleId(): bigint {
        return this._employeeRoleId;
    }
    get branchOfficeId(): bigint {
        return this._branchOfficeId;
    }
    get addressId(): bigint {
        return this._addressId;
    }
    get firstName(): EmployeeFirstNameVO {
        return this._firstName;
    }
    get lastName(): EmployeeLastNameVO {
        return this._lastName;
    }
    get email(): EmployeeEmailVO {
        return this._email;
    }
    get phoneNumber(): EmployeePhoneNumberVO {
        return this._phoneNumber;
    }
    get birthDate(): EmployeeBirthDateVO {
        return this._birthDate;
    }
    get gender(): GenderEnum {
        return this._gender;
    }
    get hireDate(): EmployeeHireDateVO {
        return this._hireDate;
    }
    get terminationDate(): EmployeeTerminationDateVO {
        return this._terminationDate;
    }
    get entryTime(): string {
        return this._entryTime;
    }
    get exitTime(): string {
        return this._exitTime;
    }
    get isActive(): boolean {
        return this._isActive;
    }
    get photoUrl(): string {
        return this._photoUrl;
    }
    get employeeRole(): EmployeeRoleEntity | undefined | null {
        return this._employeeRole;
    }
    get branchOffice(): BranchOffice | undefined | null {
        return this._branchOffice;
    }
    get address(): AddressEntity | undefined | null {
        return this._address;
    }
    get currentSalary(): EmployeeCurrentSalaryVO {
        return this._currentSalary;
    }
    get createdAt(): Date {
        return this._createdAt;
    }
    get updatedAt(): Date | null {
        return this._updatedAt;
    }
    get deletedAt(): Date | null {
        return this._deletedAt;
    }


    /**
     * Obtiene y borra los eventos de dominio registrados.
     * Este método será llamado por la capa de aplicación o infraestructura
     * después de que el agregado sea persistido o sus operaciones completadas.
     */
    public getAndClearEvents(): DomainEvent<this>[] {
        const events = [...this._domainEvents];
        this._domainEvents = []; // Limpiar los eventos después de haberlos obtenido
        return events;
    }

    // Métodos de comportamiento del dominio
    public updateName(newName: EmployeeFirstNameVO): void {
        if (this._firstName.equals(newName)) {
            return; // No hay cambio, no se hace nada
        }
        this._firstName = newName;
        this._updatedAt = new Date();
        // Registra un evento de dominio si tienes uno para updateName, por ejemplo:
        // this.recordEvent(new EmployeeRoleCreatedEvent(this));
    }

    public softDelete(): void {
        if (this._deletedAt) {
            return; // Ya está marcado como eliminado
        }
        this._deletedAt = new Date();
        this._updatedAt = new Date(); // Actualizamos también la fecha de actualización
        // this.recordEvent(new EmployeeRoleDeletedEvent(this.id));
    }

    public restore(): void {
        if (!this._deletedAt) {
            return; // No está eliminado
        }
        this._deletedAt = null;
        this._updatedAt = new Date();
        // this.recordEvent(new EmployeeRoleRestoredEvent(this.id));
    }
    /**
     * Registra un evento de dominio para ser despachado posteriormente.
     * @param event El evento de dominio a registrar.
     */
    private recordEvent(event: DomainEvent<this>): void {
        this._domainEvents.push(event);
    }
}

