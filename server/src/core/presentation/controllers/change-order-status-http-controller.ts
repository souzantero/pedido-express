import { ChangeOrderStatus, Order, OrderStatus } from '@pedido-express/core';
import {
  BadRequestError,
  HttpController,
  HttpRequest,
  HttpResponse,
  InternalServerError,
  NotFoundError,
} from './http-controller';
import {
  OrderIsAlreadyCanceled,
  OrderIsAlreadyDelivered,
  OrderNotFound,
  OrderStatusIsTheSame,
} from '../../application/use-cases/change-order-status';

export class ChangeOrderStatusHttpController implements HttpController<Order> {
  constructor(private readonly changeOrderStatus: ChangeOrderStatus) {}

  async handle(request: HttpRequest): Promise<HttpResponse<Order>> {
    const { orderId } = request.params;
    const { status } = request.body;

    if (!status) {
      return HttpResponse.error(new BadRequestError('Missing status'));
    }

    if (!Object.values(OrderStatus).includes(status)) {
      return HttpResponse.error(new BadRequestError('Invalid status'));
    }

    try {
      const order = await this.changeOrderStatus.changeStatus(orderId, status);
      return HttpResponse.ok(order);
    } catch (error) {
      if (error instanceof OrderNotFound)
        return HttpResponse.error(new NotFoundError(error.message));
      else if (error instanceof OrderIsAlreadyDelivered)
        return HttpResponse.error(new BadRequestError(error.message));
      else if (error instanceof OrderIsAlreadyCanceled)
        return HttpResponse.error(new BadRequestError(error.message));
      else if (error instanceof OrderStatusIsTheSame)
        return HttpResponse.error(new BadRequestError(error.message));
      else return HttpResponse.error(new InternalServerError(error));
    }
  }
}
