import { Order } from '@pedido-express/core';
import { EventHandler } from './event-handler';

export class OrderCreatedEventHandler implements EventHandler<Order> {
  handle(order: Order): Promise<void> {
    return new Promise((resolve) => {
      console.log('Order created:', order);
      resolve();
    });
  }
}
