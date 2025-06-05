import { DomainEvent } from "src/shared/domain/events/domain-events";
import { BranchOffice } from "../entities/branch-office.entity";

export class BranchOfficeCreatedEvent extends DomainEvent<BranchOffice>{
    // Las propiedades del evento son inmutables y de solo lectura.
    public readonly payload: BranchOffice;
  constructor(
    payload: BranchOffice,
  ) {
    super(payload); // Llama al constructor de la clase base DomainEvent
    this.payload = payload;
  }
}