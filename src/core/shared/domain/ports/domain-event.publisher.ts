export const DOMAIN_EVENT_PUBLISHER = 'DOMAIN_EVENT_PUBLISHER';

export interface DomainEventPublisher{
    emit<T>(eventName: string, payload:T):void;
    on<T>(eventName: string, handler:(payload: T) => void):void;
}