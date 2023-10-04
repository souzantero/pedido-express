import { Order, OrderRepository, OrderStatus } from '@pedido-express/core';

export class InMemoryOrderDatabase implements OrderRepository {
  constructor(private readonly orders: Order[] = []) {}

  create(order: Order): Promise<Order> {
    this.orders.push(order);
    return Promise.resolve(order);
  }

  findAllByStatus(status: OrderStatus): Promise<Order[]> {
    return Promise.resolve(
      this.orders.filter((order) => order.status === status),
    );
  }
}
