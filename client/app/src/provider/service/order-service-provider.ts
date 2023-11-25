import { CreateOrderInput, Order, OrderStatus } from "@pedido-express/core";
import { Client } from "@pedido-express/sdk";
import { OrderService } from "../../service";

export class OrderServiceProvider implements OrderService {
  constructor(
    private readonly client: Client
  ) { }

  create(input: CreateOrderInput): Promise<Order> {
    return this.client.order.create(input);
  }

  changeStatus(orderId: string, status: OrderStatus): Promise<Order> {
    return this.client.order.changeStatus(orderId, status);
  }

  findById(orderId: string): Promise<Order> {
    return this.client.order.findById(orderId);
  }

  findDayOrders(): Promise<Order[]> {
    return this.client.order.findDayOrders();
  }
}