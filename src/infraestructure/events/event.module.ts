import { Global, Module } from "@nestjs/common";
import { DOMAIN_EVENT_PUBLISHER } from "../../core/shared/domain/ports/domain-event.publisher";
import { EventEmitterPublisher } from "./event-emitter.publisher";

@Global()
@Module({
    providers:[
        {
            provide: DOMAIN_EVENT_PUBLISHER,
            useClass: EventEmitterPublisher
        },
    ],
    exports:[
        DOMAIN_EVENT_PUBLISHER
    ]
})
export class EventModule{}