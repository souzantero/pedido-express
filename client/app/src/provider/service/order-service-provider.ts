import { CreateOrderInput, Order } from "@pedido-express/core";
import { Client } from "@pedido-express/sdk";
import { OrderService } from "../../service";

export class OrderServiceProvider implements OrderService {
  constructor(
    private readonly client: Client
  ) { }

  create(input: CreateOrderInput): Promise<Order> {
    return this.client.order.create(input);
  }
}