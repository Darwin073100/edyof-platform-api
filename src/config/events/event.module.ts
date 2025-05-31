import { Global, Module } from "@nestjs/common";
import { EventEmitterPublisher } from "./event-emitter.publisher";

@Global()
@Module({
    providers:[
        {
            provide: 'DOMAIN_EVENT_PUBLISHER',
            useClass: EventEmitterPublisher
        },
    ],
    exports:[
        'DOMAIN_EVENT_PUBLISHER'
    ]
})
export class EventModule{}