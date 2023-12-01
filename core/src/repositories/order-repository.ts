import { Order } from "../entities";

export interface OrderRepository extends CreateOrderRepository, FindOrdersRepository { }
export interface CreateOrderRepository {
  create(order: Order): Promise<Order>;
}

export interface UpdateOrderRepository {
  updateById(orderId: string, data: Omit<Order, 'id'>): Promise<Order> // IN PROGRESS
}

export interface FindOrdersRepository {
  findDayOrders(): Promise<Order[]>;
}

export interface FindOrderRepository {
  findById(orderId: string): Promise<Order | null>;
}