import { Order } from '@pedido-express/core';
import { AsyncEventEmitter } from './async-event-emitter';

// TODO: Move to domain
export interface OrderCreatedEvent {
  orderCreated(order: Order): Promise<void>;
}

export class OrderCreatedEventEmitter
  extends AsyncEventEmitter<Order>
  implements OrderCreatedEvent
{
  constructor() {
    super('orderCreated');
  }

  orderCreated(order: Order): Promise<void> {
    return this.emit(order);
  }
}
