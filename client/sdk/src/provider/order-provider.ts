import { CreateOrder, CreateOrderInput, Order, OrderSerializer } from "@pedido-express/core";
import { Provider } from "./provider";

export class OrderProvider implements CreateOrder {
  constructor(
    private readonly provider: Provider
  ) { }

  create(input: CreateOrderInput): Promise<Order> {
    return this.provider.post('/orders', input)
      .then((order: any) => new OrderSerializer(order).serialize());
  }
}

