import { Entity } from './entity'; // La clase base Entity, que veremos a continuación
import { DomainEvent } from '../events/domain-events'; // La clase base DomainEvent, que también veremos

/**
 * AggregateRoot es una clase base abstracta para todas las entidades raíz de agregados.
 * Extiende de Entity y añade la capacidad de registrar y gestionar eventos de dominio.
 *
 * @template T Los tipos de las propiedades de la entidad.
 */
export abstract class AggregateRoot<T extends { id: bigint }> extends Entity<T> {
  // Lista privada para almacenar los eventos de dominio que ocurren en este agregado.
  private domainEvents: DomainEvent[] = [];

  protected constructor(props: T) {
    super(props);
  }

  /**
   * Añade un evento de dominio a la lista de eventos.
   * Estos eventos se pueden despachar después de que la transacción se haya completado con éxito.
   * @param event El evento de dominio a añadir.
   */
  protected addEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  /**
   * Obtiene todos los eventos de dominio registrados y luego los limpia.
   * Este método es típicamente llamado por el repositorio después de persistir el agregado,
   * para que los eventos puedan ser despachados.
   * @returns Un array de eventos de dominio.
   */
  public getAndClearEvents(): DomainEvent[] {
    const events = this.domainEvents;
    this.domainEvents = []; // Limpia la lista de eventos después de obtenerlos
    return events;
  }
}