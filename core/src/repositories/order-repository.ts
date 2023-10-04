import { Order, OrderStatus } from "../entities";

export interface OrderRepository extends CreateOrderRepository, FindOrdersRepository { }
export interface CreateOrderRepository {
  create(order: Order): Promise<Order>;
}

export interface FindOrdersRepository {
  findAllByStatus(status: OrderStatus): Promise<Order[]>;
}