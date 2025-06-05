import { DomainEvent } from "src/shared/domain/events/domain-events";
import { BrandNameVO } from "../values-objects/brand-name.vo";
import { BrandCreatedEvent } from "../events/brand-created.event";

export class BrandEntity {
    private readonly _brandId: bigint;
    private _name: BrandNameVO;
    private readonly _createdAt: Date;
    private _updatedAt: Date | null;
    private _deletedAt: Date | null;
    private _domainEvents: DomainEvent<this>[] = []; // Colección de eventos de dominio

    private constructor(
    brandId: bigint,
    name: BrandNameVO,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    ) {
        this._brandId = brandId;
        this._name = name;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;
    }

    /**
   * Crea una nueva instancia de Establishment.
   * Este es un método de fábrica para asegurar la creación controlada del agregado.
   * Un evento de dominio EstablishmentCreatedEvent se registra internamente.
   *
   * @param brandId El ID único del centro educativo.
   * @param name El nombre del centro educativo.
   * @returns Una nueva instancia de Establishment.
   */
  static create(brandId: bigint, name: BrandNameVO): BrandEntity {
    const brand = new BrandEntity(
      brandId,
      name,
      new Date(), // createdAt
      null, // updatedAt
      null, // deletedAt
    );
    // Registra el evento de dominio.
    brand.recordEvent(new BrandCreatedEvent(brand));
    return brand;
  }

  /**
   * Reconstituye una instancia de Establishment desde la persistencia.
   * No emite eventos ya que representa un estado ya existente.
   *
   * @param brandId El ID único del centro educativo.
   * @param name El nombre del centro educativo.
   * @param createdAt La fecha de creación.
   * @param updatedAt La fecha de la última actualización.
   * @param deletedAt La fecha de borrado lógico.
   * @returns Una instancia de Establishment reconstituida.
   */
  static reconstitute(
    brandId: bigint,
    name: BrandNameVO,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ): BrandEntity {
    return new BrandEntity(brandId, name, createdAt, updatedAt, deletedAt);
  }

  // Getters
  get brandId(): bigint {
    return this._brandId;
  }

  get name(): BrandNameVO {
    return this._name;
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
  public updateName(newName: BrandNameVO): void {
    if (this._name.equals(newName)) {
      return; // No hay cambio, no se hace nada
    }
    this._name = newName;
    this._updatedAt = new Date();
    // Registra un evento de dominio si tienes uno para updateName, por ejemplo:
    // this.recordEvent(new EstablishmentCreatedEvent(this));
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

