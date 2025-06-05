
// Eventos de Dominio que podríamos definir más adelante (ej. BranchOfficeCreatedEvent)
// import { BranchOfficeCreatedEvent } from '../events/branch-office-created.event';

import { Name } from "src/contexts/establishment-management/establishment/domain/values-objects/name.vo";
import { Address } from "../../../../../shared/domain/value-objects/address.vo";
import { BranchOfficeNameVO } from "../value-objects/branch-office-name.vo";
import { DomainEvent } from "src/shared/domain/events/domain-events";
import { BranchOfficeCreatedEvent } from "../events/branch-office-created.event";
import { CategoryCreatedEvent } from "src/contexts/product-management/category/domain/events/category-created.event";
  
  /**
   * BranchOffice es una Entidad Raíz de Agregado.
   * Es el punto de consistencia transaccional para la sucursal y su dirección.
   * Contiene la identidad de la sucursal y encapsula la lógica de negocio.
   */
  export class BranchOffice {
    private readonly _branchId: bigint;
    private _name: BranchOfficeNameVO;
    private _address: Address; // La dirección es parte de la sucursal
    private _establishmentId: bigint; // ID del Establishment al que pertenece
    private readonly _createdAt: Date;
    private _updatedAt?: Date | null;
    private _deletedAt?: Date | null;
    private _domainEvents: DomainEvent<this>[] = []; // Colección de eventos de dominio
    // El constructor es privado para forzar el uso de métodos de fábrica para la creación.
    // Esto asegura que la entidad solo se cree en un estado válido.
    private constructor(
      branchOfficeId: bigint,
      name: BranchOfficeNameVO,
      address: Address, // La dirección es parte de la sucursal
      establishmentId: bigint, // ID del Establishment al que pertenece
      createdAt: Date,
      updatedAt?: Date | null,
      deletedAt?: Date | null) {
        this._branchId = branchOfficeId;
        this._name = name;
        this._address = address;
        this._establishmentId = establishmentId;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;
    }
  
    get branchOfficeId(): bigint {
      return this._branchId;
    }
  
    get name(): BranchOfficeNameVO {
      return this._name;
    }
  
    get address(): Address {
      return this._address;
    }
  
    get establishmentId(): bigint {
      return this._establishmentId;
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
  
    /**
     * Método de fábrica para crear una nueva instancia de BranchOffice.
     * Aplica las reglas de negocio para la creación de una sucursal.
     * @param branchOfficeId El ID provisional de la sucursal (o generado por el dominio si es un UUID).
     * @param name El Value Object Name de la sucursal.
     * @param address El Value Object Address de la sucursal.
     * @param establishmentId El ID del establecimeinto al que pertenece la sucursal.
     * @returns Una nueva instancia de BranchOffice.
     */
    public static create(
      branchOfficeId: bigint,
      name: Name,
      address: Address,
      establishmentId: bigint,
    ): BranchOffice {
      const branchOffice = new BranchOffice(
        branchOfficeId,
        name,
        address,
        establishmentId,
        new Date(),
        null,
        null,
      );
  
      // Opcional: Registrar un evento de dominio BranchOfficeCreatedEvent
      // branchOffice.addEvent(new BranchOfficeCreatedEvent(branchOffice.id, branchOffice.educationalCenterId));
      branchOffice.recordEvent(new BranchOfficeCreatedEvent(branchOffice));
      return branchOffice;
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
      branchOfficeId: bigint,
      name: BranchOfficeNameVO,
      address: Address,
      establishmentId: bigint,
      createdAt: Date,
      updatedAt: Date | null = null,
      deletedAt: Date | null = null,
    ): BranchOffice {
      return new BranchOffice(
        branchOfficeId,
        name,
        address,
        establishmentId,
        createdAt,
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