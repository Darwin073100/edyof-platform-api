import { DomainEvent } from 'src/shared/domain/events/domain-events';
import { CategoryNameVO } from '../value-objects/category-name.vo';
import { CategoryDescriptionVO } from '../value-objects/category-description.vo';
import { CategoryCreatedEvent } from '../events/category-created.event';

export class CategoryEntity {
  private readonly _categoryId: bigint;
  private _name: CategoryNameVO;
  private _description?: CategoryDescriptionVO | null;
  private readonly _createdAt: Date;
  private _updatedAt: Date | null;
  private _deletedAt: Date | null;
  private _domainEvents: DomainEvent<CategoryEntity>[] = [];

  private constructor(
    categoryId: bigint,
    name: CategoryNameVO,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    description?: CategoryDescriptionVO | null,
  ) {
    this._categoryId = categoryId;
    this._name = name;
    this._description = description;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
  }

  /**
   * Crea una nueva instancia de Category.
   * Este es un método de fábrica para asegurar la creación controlada del agregado.
   * Un evento de dominio CategoryCreatedEvent se registra internamente.
   *
   * @param categoryId El ID único de la categoría.
   * @param name El nombre del centro educativo.
   * @returns Una nueva instancia de Category.
   */

  static create(
    categoryId: bigint,
    name: CategoryNameVO,
    description?: CategoryDescriptionVO | null,
  ): CategoryEntity {
    const category = new CategoryEntity(
      categoryId,
      name,
      new Date(),
      null,
      null,
      description,
    );
    category.recordEvent(new CategoryCreatedEvent(category));
    return category;
  }

  static reconstitute(
    categoryId: bigint,
    name: CategoryNameVO,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    description?: CategoryDescriptionVO | null,
  ): CategoryEntity {
    return new CategoryEntity(
      categoryId,
      name,
      createdAt,
      updatedAt,
      deletedAt,
      description,
    );
  }

  // Getters
  get categoryId(): bigint {
    return this._categoryId;
  }

  get name(): CategoryNameVO {
    return this._name;
  }

  get description(): CategoryDescriptionVO | null | undefined {
    return this._description;
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

  // Métodos de comportamiento del dominio
    public updateName(newName: CategoryNameVO): void {
      if (this._name.equals(newName)) {
        return; // No hay cambio, no se hace nada
      }
      this._name = newName;
      this._updatedAt = new Date();
      this.recordEvent(new CategoryCreatedEvent(this)); // Un evento de ejemplo
    }

  // Métodos de comportamiento del dominio
    public updateDescription(newDescription: CategoryDescriptionVO): void {
      if (this._description?.equals(newDescription)) {
        return; // No hay cambio, no se hace nada
      }
      this._description = newDescription;
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
   * Obtiene y borra los eventos de dominio registrados.
   * Este método será llamado por la capa de aplicación o infraestructura
   * después de que el agregado sea persistido o sus operaciones completadas.
   */
  public getAndClearEvents(): DomainEvent<CategoryEntity>[] {
    const events = [...this._domainEvents];
    this._domainEvents = []; // Limpiar los eventos después de haberlos obtenido
    return events;
  }

  /**
   * Registra un evento de dominio para ser despachado posteriormente.
   * @param event El evento de dominio a registrar.
   */
  private recordEvent(event: DomainEvent<CategoryEntity>): void {
    this._domainEvents.push(event);
  }
}
