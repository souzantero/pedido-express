import { ChangeOrderStatus, Order, OrderStatus } from "@pedido-express/core";
import { BadRequestError, HttpController, HttpRequest, HttpResponse, NotFoundError } from "./http-controller";
import { OrderIsAlreadyCanceled, OrderIsAlreadyDelivered, OrderNotFound, OrderStatusIsTheSame } from "../../application/use-cases/change-order-status";

export class ChangeOrderStatusHttpController implements HttpController<Order> {
  constructor(
    private readonly changeOrderStatus: ChangeOrderStatus
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse<Order>> {
    const { orderId } = request.params;
    const { status } = request.body;

    if (!status) {
      throw new BadRequestError('Missing status');
    }

    if (!Object.values(OrderStatus).includes(status)) {
      throw new BadRequestError('Invalid status');
    }

    try {
      const order = await this.changeOrderStatus.changeStatus(orderId, status);
      return HttpResponse.ok(order);
    } catch (error) {
      if (error instanceof OrderNotFound)
        throw new NotFoundError(error.message);
      else if (error instanceof OrderIsAlreadyDelivered)
        throw new BadRequestError(error.message);
      else if (error instanceof OrderIsAlreadyCanceled)
        throw new BadRequestError(error.message);
      else if (error instanceof OrderStatusIsTheSame)
        throw new BadRequestError(error.message);
      else throw error
    }
  }
}