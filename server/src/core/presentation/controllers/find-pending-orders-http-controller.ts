import { Order, FindOrders } from '@pedido-express/core';
import { HttpResponse } from './http-controller';

export class FindPendingOrdersHttpController {
  constructor(private readonly findOrders: FindOrders) {}
  async handle(): Promise<HttpResponse<Order[]>> {
    const orders = await this.findOrders.findAllPendingOrders();
    return HttpResponse.ok(orders);
  }
}
