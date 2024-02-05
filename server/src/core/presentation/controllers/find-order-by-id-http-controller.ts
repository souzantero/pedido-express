import { Order, FindOrderRepository } from '@pedido-express/core';
import {
  HttpController,
  HttpRequest,
  HttpResponse,
  NotFoundError,
} from './http-controller';

export class FindOrderByIdHttpController implements HttpController<Order> {
  constructor(private readonly findOrderRepository: FindOrderRepository) {}
  async handle(request: HttpRequest): Promise<HttpResponse<Order>> {
    const { orderId } = request.params;
    const order = await this.findOrderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    return HttpResponse.ok(order);
  }
}
