import { DomainEvent } from "src/shared/domain/events/domain-events";

export class CategoryCreatedEvent extends DomainEvent{
    public readonly payload: any;

    constructor(payload: any){
        super(payload)
        this.payload = payload;
    }
}