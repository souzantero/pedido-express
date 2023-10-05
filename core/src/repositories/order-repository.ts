import { Order } from "../entities";

export interface OrderRepository extends CreateOrderRepository, FindOrdersRepository { }
export interface CreateOrderRepository {
  create(order: Order): Promise<Order>;
}

export interface FindOrdersRepository {
  findDayOrders(): Promise<Order[]>;
}