import { ChangeOrderStatus, CreateOrder, CreateOrderInput, FindOrderRepository, FindOrdersRepository, Order, OrderSerializer, OrderStatus } from "@pedido-express/core";
import { Provider } from "./provider";

export class OrderProvider implements FindOrderRepository, FindOrdersRepository, ChangeOrderStatus, CreateOrder {
  constructor(
    private readonly provider: Provider
  ) { }

  changeStatus(orderId: string, status: OrderStatus): Promise<Order> {
    return this.provider.put(`/orders/${orderId}/status`, { status })
      .then((order: any) => new OrderSerializer(order).serialize());
  }

  create(input: CreateOrderInput): Promise<Order> {
    return this.provider.post('/orders', input)
      .then((order: any) => new OrderSerializer(order).serialize());
  }

  findById(orderId: string): Promise<Order> {
    return this.provider.get(`/orders/${orderId}`)
      .then((order: any) => new OrderSerializer(order).serialize());
  }

  findDayOrders(): Promise<Order[]> {
    return this.provider.get('/orders/of-the-day')
      .then((orders: any[]) => orders.map((order) => new OrderSerializer(order).serialize()));
  }
}

