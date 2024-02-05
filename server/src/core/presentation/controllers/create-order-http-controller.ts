import { Order } from '@pedido-express/core';
import { CreateOrder, CreateOrderInput } from '../../application/use-cases';
import {
  BadRequestError,
  HttpRequest,
  HttpResponse,
  InternalServerError,
  NotFoundError,
} from './http-controller';
import { ProductsNotFoundError } from '../../application/errors';

export class CreateOrderHttpController {
  constructor(private readonly createOrder: CreateOrder) {}
  async handle(request: HttpRequest): Promise<HttpResponse<Order>> {
    const { customerName, isTakeAway, orderProducts } = request.body;

    if (!customerName) {
      return HttpResponse.error(
        new BadRequestError('customerName is required'),
      );
    }

    if (!orderProducts || orderProducts.length === 0) {
      return HttpResponse.error(
        new BadRequestError('orderProducts is required'),
      );
    }

    if (orderProducts.some((op: any) => !op.productId)) {
      return HttpResponse.error(
        new BadRequestError('orderProducts.productId is required'),
      );
    }

    if (orderProducts.some((op: any) => !op.quantity)) {
      return HttpResponse.error(
        new BadRequestError('orderProducts.quantity is required'),
      );
    }

    if (orderProducts.some((op: any) => typeof op.quantity !== 'number')) {
      return HttpResponse.error(
        new BadRequestError('orderProducts.quantity must be a number'),
      );
    }

    const data: CreateOrderInput = {
      customerName,
      isTakeAway: !!isTakeAway,
      orderProducts,
    };

    try {
      const order = await this.createOrder.create(data);
      return HttpResponse.created(order);
    } catch (error) {
      if (error instanceof ProductsNotFoundError) {
        return HttpResponse.error(new NotFoundError(error.message));
      }

      return HttpResponse.error(new InternalServerError(error));
    }
  }
}
