
// Eventos de Dominio que podríamos definir más adelante (ej. BranchOfficeCreatedEvent)
// import { BranchOfficeCreatedEvent } from '../events/branch-office-created.event';

import { Name } from "src/contexts/establishment-management/establishment/domain/values-objects/name.vo";
import { AddressEntity } from "../../../../../shared/domain/value-objects/address.vo";
import { SuplierNameVO } from "../value-objects/suplier-name.vo";
import { DomainEvent } from "src/shared/domain/events/domain-events";
import { SuplierCreatedEvent } from "../events/suplier-created.event";
import { CategoryCreatedEvent } from "src/contexts/product-management/category/domain/events/category-created.event";
import { SuplierRFCVO } from "../value-objects/suplier-rfc.vo";
import { SuplierContactPersonVO } from "../value-objects/suplier-contact-person.vo";
import { SuplierPhoneNumberVO } from "../value-objects/suplier-phone-number.vo";
import { SuplierEmailVO } from "../value-objects/suplier-email.vo";
import { SuplierNotesVO } from "../value-objects/suplier-notes.vo";
  
  export class SuplierEntity {
    private readonly _suplierId: bigint;
    private _name: SuplierNameVO;
    private _contactPerson?: SuplierContactPersonVO | null;
    private _phoneNumber: SuplierPhoneNumberVO;
    private _email?: SuplierEmailVO | null;
    private _rfc?: SuplierRFCVO | null;
    private _notes?: SuplierNotesVO | null;
    private _address: AddressEntity; // La dirección es parte del proveedor
    private readonly _createdAt: Date;
    private _updatedAt?: Date | null;
    private _deletedAt?: Date | null;
    private _domainEvents: DomainEvent<this>[] = []; // Colección de eventos de dominio
    // El constructor es privado para forzar el uso de métodos de fábrica para la creación.
    // Esto asegura que la entidad solo se cree en un estado válido.
    private constructor(
      suplierId: bigint,
      name: SuplierNameVO,
      phoneNumber: SuplierPhoneNumberVO,
      address: AddressEntity, // La dirección es parte de la sucursal
      createdAt: Date,
      rfc?: SuplierRFCVO | null,
      contactPerson?: SuplierContactPersonVO | null,
      email?: SuplierEmailVO | null,
      notes?: SuplierNotesVO | null,
      updatedAt?: Date | null,
      deletedAt?: Date | null) {
        this._suplierId = suplierId;
        this._name = name;
        this._address = address;
        this._rfc = rfc;
        this._phoneNumber = phoneNumber;
        this._contactPerson = contactPerson;
        this._email = email;
        this._notes = notes;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;
    }
  
    get suplierId(): bigint {
      return this._suplierId;
    }
  
    get name(): SuplierNameVO {
      return this._name;
    }

    get phoneNumber(): SuplierPhoneNumberVO{
      return this._phoneNumber;
    }

    get email(): SuplierEmailVO | null | undefined{
      return this._email;
    }

    get contactPerson(): SuplierContactPersonVO | null | undefined{
      return this._contactPerson;
    }

    get notes(): SuplierNotesVO | null | undefined{
      return this._notes;
    }
  
    get address(): AddressEntity {
      return this._address;
    }
  
    get rfc(): SuplierRFCVO | null | undefined {
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
      suplierId: bigint,
      name: Name,
      phoneNumber: SuplierPhoneNumberVO,
      address: AddressEntity,
      rfc?: SuplierRFCVO | null,
      contactPerson?: SuplierContactPersonVO | null,
      email?: SuplierEmailVO | null,
      notes?: SuplierNotesVO | null,
    ): SuplierEntity {
      const suplier = new SuplierEntity(
        suplierId,
        name,
        phoneNumber,
        address,
        new Date(),
        rfc,
        contactPerson,
        email,
        notes,
        null,
        null,
      );
  
      // Opcional: Registrar un evento de dominio BranchOfficeCreatedEvent
      // branchOffice.addEvent(new BranchOfficeCreatedEvent(branchOffice.id, branchOffice.educationalCenterId));
      suplier.recordEvent(new SuplierCreatedEvent(suplier));
      return suplier;
    }
  
    /**
     * Método de fábrica para reconstituir una instancia de BranchOffice desde datos persistidos.
     * NO aplica las reglas de negocio de creación, asumiendo que los datos ya son válidos.
     * @param id El ID de la sucursal.
     * @param name El Value Object Name de la sucursal.
     * @param address El Value Object Address de la sucursal.
     * @param establishmentId El ID del establecimeinto al que pertenece.
     * @param createdAt La fecha de creación.
     * @param updatedAt La fecha de la última actualización.
     * @param deletedAt La fecha de borrado lógico.
     * @returns Una instancia de BranchOffice.
     */
    public static reconstitute(
      suplierId: bigint,
      name: SuplierNameVO,
      phoneNumber: SuplierPhoneNumberVO,
      address: AddressEntity,
      createdAt: Date,
      rfc?: SuplierRFCVO | null,
      contactPerson?: SuplierContactPersonVO | null,
      email?: SuplierEmailVO | null,
      notes?: SuplierNotesVO | null,
      updatedAt: Date | null = null,
      deletedAt: Date | null = null,
    ): SuplierEntity {
      return new SuplierEntity(
        suplierId,
        name,
        phoneNumber,
        address,
        createdAt,
        rfc,
        contactPerson,
        email,
        notes,
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
      public updateName(newName: Name): void {
        if (this._name.equals(newName)) {
          return; // No hay cambio, no se hace nada
        }
        this._name = newName;
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