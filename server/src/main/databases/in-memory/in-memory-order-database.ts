import { Order, OrderRepository } from '@pedido-express/core';

export class InMemoryOrderDatabase implements OrderRepository {
  constructor(private readonly orders: Order[] = []) {}

  findById(orderId: string): Promise<Order | null> {
    const order = this.orders.find((order) => order.id === orderId);
    return Promise.resolve(order || null);
  }

  findDayOrders(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  create(order: Order): Promise<Order> {
    this.orders.push(order);
    return Promise.resolve(order);
  }

  async updateById(
    orderId: string,
    data: Partial<Pick<Order, 'status'>>,
  ): Promise<Order> {
    const order = this.orders.find((order) => order.id === orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    Object.assign(order, data);
    return order;
  }
}
