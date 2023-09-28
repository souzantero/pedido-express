import { Order, OrderRepository } from '@pedido-express/domain';

export class InMemoryOrderDatabase implements OrderRepository {
  constructor(private readonly orders: Order[] = []) {}

  create(order: Order): Promise<Order> {
    this.orders.push(order);
    return Promise.resolve(order);
  }
}
