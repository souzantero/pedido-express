import { Order } from "../entities";

export interface OrderRepository extends CreateOrderRepository { }
export interface CreateOrderRepository {
  create(order: Order): Promise<Order>;
}