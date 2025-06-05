// src/shared/domain/events/domain-event.ts
// Esta clase NO tendrá dependencias externas.

/**
 * Clase abstracta base para todos los eventos de dominio.
 * Los eventos de dominio son hechos significativos que ocurrieron dentro de un agregado.
 * Esta clase es completamente agnóstica a cualquier framework.
 */
export abstract class DomainEvent<T> {
    // La fecha y hora en que ocurrió el evento
   public readonly occurredOn: Date;
   // El ID del agregado que emitió este evento
   public readonly payload: T;
   // Un identificador único para este evento en particular (UUID, por ejemplo)
   public readonly eventId: string;
 
   constructor(payload: T) {
     this.occurredOn = new Date();
     this.payload = payload;
     this.eventId = crypto.randomUUID(); // Generamos un UUID para cada evento
     Object.freeze(this.eventId);
   }
   
 }