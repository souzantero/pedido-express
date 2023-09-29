import { Order } from '@pedido-express/core';
import { CreateOrder, CreateOrderInput } from '../../application/use-cases';
import {
  BadRequestError,
  HttpRequest,
  HttpResponse,
  NotFoundError,
} from './http-controller';
import { ProductsNotFoundError } from '../../application/errors';

export class CreateOrderHttpController {
  constructor(private readonly createOrder: CreateOrder) {}
  async handle(request: HttpRequest): Promise<HttpResponse<Order>> {
    const { customerName, isTakeAway, orderProducts } = request.body;

    if (!customerName) {
      throw new BadRequestError('customerName is required');
    }

    if (!orderProducts || orderProducts.length === 0) {
      throw new BadRequestError('orderProducts is required');
    }

    if (orderProducts.some((op: any) => !op.productId)) {
      throw new BadRequestError('orderProducts.productId is required');
    }

    if (orderProducts.some((op: any) => !op.quantity)) {
      throw new BadRequestError('orderProducts.quantity is required');
    }

    if (orderProducts.some((op: any) => typeof op.quantity !== 'number')) {
      throw new BadRequestError('orderProducts.quantity must be a number');
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
      if (error instanceof ProductsNotFoundError)
        throw new NotFoundError(error.message);
      throw error;
    }
  }
}
