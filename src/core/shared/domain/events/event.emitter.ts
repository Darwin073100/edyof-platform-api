export type EventHandler<T = any> = (data:T) => void;

export class EventEmitter{
    private listeners: {[key: string]: EventHandler[]} = {};

    on<T>(event: string, handler: EventHandler<T>): void {
        if(!this.listeners[event]){
            this.listeners[event] = [];
        }
        this.listeners[event].push(handler);
    }

    emit<T>(event: string, data: T): void {
        if(this.listeners[event]){
            this.listeners[event].forEach(handler => handler(data));
        }
    }

    off<T>(event: string, handlerToRemove?: EventHandler<T>): void {
        if(this.listeners[event]){
            if(handlerToRemove){
                this.listeners[event] = this.listeners[event].filter(handler => handler !== handlerToRemove);
            } else {
                delete this.listeners[event]; // Elimina todos los eventos del listener
            }
        }
    }
}

export const DomainEventBus = new EventEmitter();