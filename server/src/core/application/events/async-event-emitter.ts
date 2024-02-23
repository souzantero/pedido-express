import EventEmitter from 'events';
import { EventHandler } from './handlers/event-handler';

export class AsyncEventEmitter<T> {
  private readonly eventEmitter: EventEmitter = new EventEmitter();

  constructor(private readonly eventName: string) {}

  on(handler: EventHandler<T>): void {
    this.eventEmitter.on(
      this.eventName,
      (event: T, callback: EventListenerCallback) => {
        handler
          .handle(event)
          .then(() => callback())
          .catch(callback);
      },
    );
  }

  emit(event: T): Promise<void> {
    return new Promise((resolve, reject) => {
      this.eventEmitter.emit(this.eventName, event, (err: Error) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export type EventListenerCallback = (err?: Error) => void;
