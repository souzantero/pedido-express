import { CreateOrder, CreateOrderInput, FindOrders, Order, OrderSerializer } from "@pedido-express/core";
import { Provider } from "./provider";

export class OrderProvider implements FindOrders, CreateOrder {
  constructor(
    private readonly provider: Provider
  ) { }

  create(input: CreateOrderInput): Promise<Order> {
    return this.provider.post('/orders', input)
      .then((order: any) => new OrderSerializer(order).serialize());
  }

  findAllPendingOrders(): Promise<Order[]> {
    return this.provider.get('/orders/pending')
      .then((orders: any[]) => orders.map((order) => new OrderSerializer(order).serialize()));
  }
  findAllPreparingOrders(): Promise<Order[]> {
    return this.provider.get('/orders/preparing')
      .then((orders: any[]) => orders.map((order) => new OrderSerializer(order).serialize()));
  }
}

