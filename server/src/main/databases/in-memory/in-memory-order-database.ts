import { Order, OrderRepository } from '@pedido-express/core';

export class InMemoryOrderDatabase implements OrderRepository {
  constructor(private readonly orders: Order[] = []) {}

  create(order: Order): Promise<Order> {
    this.orders.push(order);
    return Promise.resolve(order);
  }

  findDayOrders(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }
}
