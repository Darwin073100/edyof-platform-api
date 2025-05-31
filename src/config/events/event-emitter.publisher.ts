type EventHandler<T = any> = (payload: T) => void;

export class EventEmitterPublisher {
  private listeners: { [event: string]: EventHandler[] } = {};

  emit<T>(eventName: string, payload: T): void {
    (this.listeners[eventName] ?? []).forEach(handler => handler(payload));
  }

  on<T>(eventName: string, handler: EventHandler<T>): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(handler as EventHandler);
  }
}