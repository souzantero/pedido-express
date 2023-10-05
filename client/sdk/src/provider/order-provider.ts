import { CreateOrder, CreateOrderInput, FindOrdersRepository, Order, OrderSerializer } from "@pedido-express/core";
import { Provider } from "./provider";

export class OrderProvider implements FindOrdersRepository, CreateOrder {
  constructor(
    private readonly provider: Provider
  ) { }

  create(input: CreateOrderInput): Promise<Order> {
    return this.provider.post('/orders', input)
      .then((order: any) => new OrderSerializer(order).serialize());
  }

  findDayOrders(): Promise<Order[]> {
    return this.provider.get('/orders/of-the-day')
      .then((orders: any[]) => orders.map((order) => new OrderSerializer(order).serialize()));
  }
}

