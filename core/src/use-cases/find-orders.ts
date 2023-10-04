import { Order } from "../entities";

export interface FindOrders {
  findAllPendingOrders(): Promise<Order[]>
  findAllPreparingOrders(): Promise<Order[]>
}
