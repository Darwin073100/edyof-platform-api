import { DomainEvent } from "src/shared/domain/events/domain-events";

/**
 * EducationalCenterCreatedEvent es un Evento de Dominio que representa el hecho
 * de que un nuevo Centro Educativo ha sido creado en el sistema.
 * Es inmutable y contiene solo los datos relevantes para el hecho ocurrido.
 */
export class EstablishmentCreatedEvent extends DomainEvent {
  // Las propiedades del evento son inmutables y de solo lectura.
  public readonly establishmentId: bigint; // El ID del centro educativo que fue creado
  public readonly name: string; // El nombre del centro educativo al momento de la creación

  constructor(
    establsihemntId: bigint, // El ID del EducationalCenter que fue creado
    name: string,
  ) {
    super(establsihemntId); // Llama al constructor de la clase base DomainEvent
    this.name = name;
  }
}