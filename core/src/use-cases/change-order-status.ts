import { Order, OrderStatus } from "../entities";

export interface ChangeOrderStatus {
  changeStatus(orderId: string, status: OrderStatus): Promise<Order>
}