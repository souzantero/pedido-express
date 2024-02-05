import { Order } from "../entities";

export interface OrderRepository extends CreateOrderRepository, FindOrdersRepository, FindOrderRepository, UpdateOrderRepository { }
export interface CreateOrderRepository {
  create(order: Order): Promise<Order>;
}

export type UpdateOrderData = Partial<Pick<Order, 'status'>>
export interface UpdateOrderRepository {
  updateById(orderId: string, data: UpdateOrderData): Promise<Order>
}

export interface FindOrdersRepository {
  findDayOrders(): Promise<Order[]>;
}

export interface FindOrderRepository {
  findById(orderId: string): Promise<Order | null>;
}