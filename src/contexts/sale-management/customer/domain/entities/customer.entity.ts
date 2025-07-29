
// Eventos de Dominio que podríamos definir más adelante (ej. BranchOfficeCreatedEvent)
// import { BranchOfficeCreatedEvent } from '../events/branch-office-created.event';
import { AddressEntity } from "../../../../../shared/domain/value-objects/address.vo";
import { CustomerFirstNameVO } from "../value-objects/customer-first-name.vo";
import { DomainEvent } from "src/shared/domain/events/domain-events";
import { CustomerCreatedEvent } from "../events/customer-created.event";
import { CategoryCreatedEvent } from "src/contexts/product-management/category/domain/events/category-created.event";
import { CustomerRFCVO } from "../value-objects/customer-rfc.vo";
import { CustomerPhoneNumberVO } from "../value-objects/customer-phone-number.vo";
import { CustomerEmailVO } from "../value-objects/customer-email.vo";
import { CustomerTypeVO } from "../value-objects/customer-customer-type.vo";
import { CustomerLastNameVO } from "../value-objects/customer-last-name.vo";
import { CustomerCompanyNameVO } from "../value-objects/customer-company-name.vo";
  
  export class CustomerEntity {
    private readonly _customerId: bigint;
    private _addressId?: bigint|null;
    private _firstName: CustomerFirstNameVO;
    private _lastName?: CustomerLastNameVO | null;
    private _companyName?: CustomerCompanyNameVO | null;
    private _phoneNumber?: CustomerPhoneNumberVO|null;
    private _email?: CustomerEmailVO | null;
    private _rfc?: CustomerRFCVO | null;
    private _customerType?: CustomerTypeVO | null;
    private _address?: AddressEntity|null; // La dirección es parte del proveedor
    private readonly _createdAt: Date;
    private _updatedAt?: Date | null;
    private _deletedAt?: Date | null;
    private _domainEvents: DomainEvent<this>[] = []; // Colección de eventos de dominio
    // El constructor es privado para forzar el uso de métodos de fábrica para la creación.
    // Esto asegura que la entidad solo se cree en un estado válido.
    private constructor(
      customerId: bigint,
      firstName: CustomerFirstNameVO,
      createdAt: Date,
      addressId?: bigint|null,
      lastName?: CustomerLastNameVO|null,
      companyName?: CustomerCompanyNameVO|null,
      phoneNumber?: CustomerPhoneNumberVO|null,
      address?: AddressEntity|null, // La dirección es parte de la sucursal
      rfc?: CustomerRFCVO | null,
      email?: CustomerEmailVO | null,
      notes?: CustomerTypeVO | null,
      updatedAt?: Date | null,
      deletedAt?: Date | null
    ) {
        this._customerId = customerId;
        this._addressId = addressId;
        this._firstName = firstName;
        this._lastName = lastName;
        this._companyName = companyName;
        this._address = address;
        this._rfc = rfc;
        this._phoneNumber = phoneNumber;
        this._email = email;
        this._customerType = notes;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;
    }
  
    get customerId(): bigint {
      return this._customerId;
    }

    get addressId(): bigint|null|undefined{
      return this._addressId;
    }
  
    get firstName(): CustomerFirstNameVO {
      return this._firstName;
    }
    get lastName(): CustomerLastNameVO|null|undefined {
      return this._lastName;
    }

    get companyName(): CustomerCompanyNameVO|null|undefined{
      return this._companyName;
    }

    get phoneNumber(): undefined | CustomerPhoneNumberVO | null{
      return this._phoneNumber;
    }

    get email(): CustomerEmailVO | null | undefined{
      return this._email;
    }

    get customerType(): CustomerTypeVO | null | undefined{
      return this._customerType;
    }
  
    get address(): AddressEntity|null|undefined {
      return this._address;
    }
  
    get rfc(): CustomerRFCVO | null | undefined {
      return this._rfc;
    }
  
    get createdAt(): Date {
      return this._createdAt;
    }
  
    get updatedAt(): Date | null | undefined {
      return this._updatedAt;
    }
  
    get deletedAt(): Date | null | undefined {
      return this._deletedAt;
    }

    public static create(
      customerId: bigint,
      firstName: CustomerFirstNameVO,
      addressId?: bigint|null,
      lastName?: CustomerLastNameVO|null,
      companyName?: CustomerCompanyNameVO|null,
      phoneNumber?: CustomerPhoneNumberVO|null,
      address?: AddressEntity|null,
      rfc?: CustomerRFCVO | null,
      email?: CustomerEmailVO | null,
      customerType?: CustomerTypeVO | null,
    ): CustomerEntity {
      const suplier = new CustomerEntity(
        customerId,
        firstName,
        new Date(),
        addressId,
        lastName,
        companyName,
        phoneNumber,
        address,
        rfc,
        email,
        customerType,
        null,
        null,
      );
  
      // Opcional: Registrar un evento de dominio BranchOfficeCreatedEvent
      // branchOffice.addEvent(new BranchOfficeCreatedEvent(branchOffice.id, branchOffice.educationalCenterId));
      suplier.recordEvent(new CustomerCreatedEvent(suplier));
      return suplier;
    }
  
    public static reconstitute(
      suplierId: bigint,
      name: CustomerFirstNameVO,
      createdAt: Date,
      addressId?: bigint|null, 
      lastName?: CustomerLastNameVO|null,
      companyName?: CustomerCompanyNameVO|null,
      phoneNumber?: CustomerPhoneNumberVO|null,
      address?: AddressEntity|null,
      rfc?: CustomerRFCVO | null,
      email?: CustomerEmailVO | null,
      customerType?: CustomerTypeVO | null,
      updatedAt: Date | null = null,
      deletedAt: Date | null = null,
    ): CustomerEntity {
      return new CustomerEntity(
        suplierId,
        name,
        createdAt,
        addressId,
        lastName,
        companyName,
        phoneNumber,
        address,
        rfc,
        email,
        customerType,
        updatedAt,
        deletedAt,
      );
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
      public updateName(newName: CustomerFirstNameVO): void {
        if (this._firstName.equals(newName)) {
          return; // No hay cambio, no se hace nada
        }
        this._firstName = newName;
        this._updatedAt = new Date();
        this.recordEvent(new CategoryCreatedEvent(this)); // Un evento de ejemplo
      }
    
      public softDelete(): void {
        if (this._deletedAt) {
          return; // Ya está marcado como eliminado
        }
        this._deletedAt = new Date();
        this._updatedAt = new Date(); // Actualizamos también la fecha de actualización
        // this.recordEvent(new EstablishmentDeletedEvent(this.id));
      }
    
      public restore(): void {
        if (!this._deletedAt) {
          return; // No está eliminado
        }
        this._deletedAt = null;
        this._updatedAt = new Date();
        // this.recordEvent(new EstablishmentRestoredEvent(this.id));
      }
    
      /**
       * Registra un evento de dominio para ser despachado posteriormente.
       * @param event El evento de dominio a registrar.
       */
      private recordEvent(event: DomainEvent<this>): void {
        this._domainEvents.push(event);
      }
  }