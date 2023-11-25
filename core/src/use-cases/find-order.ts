import { Order } from "../entities";

export interface FindOrder {
  findById(orderId: string): Promise<Order>
}
