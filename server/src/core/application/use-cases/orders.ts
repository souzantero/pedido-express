import {
  FindOrders,
  FindOrdersRepository,
  Order,
  OrderStatus,
} from '@pedido-express/core';

export class Orders implements FindOrders {
  constructor(private readonly orderRepository: FindOrdersRepository) {}

  findAllPendingOrders(): Promise<Order[]> {
    return this.orderRepository.findAllByStatus(OrderStatus.Pending);
  }

  findAllPreparingOrders(): Promise<Order[]> {
    return this.orderRepository.findAllByStatus(OrderStatus.Preparing);
  }
}
