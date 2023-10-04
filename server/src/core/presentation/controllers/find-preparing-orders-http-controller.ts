import { Order, FindOrders } from '@pedido-express/core';
import { HttpResponse } from './http-controller';

export class FindPreparingOrdersHttpController {
  constructor(private readonly findOrders: FindOrders) {}
  async handle(): Promise<HttpResponse<Order[]>> {
    const orders = await this.findOrders.findAllPreparingOrders();
    return HttpResponse.ok(orders);
  }
}
