import { Order, FindOrdersRepository } from '@pedido-express/core';
import { HttpResponse } from './http-controller';

export class FindDayOrdersHttpController {
  constructor(private readonly findOrdersRepository: FindOrdersRepository) {}
  async handle(): Promise<HttpResponse<Order[]>> {
    const orders = await this.findOrdersRepository.findDayOrders();
    return HttpResponse.ok(orders);
  }
}
