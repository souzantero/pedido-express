import {
  Order,
  OrderProduct,
  OrderProducts,
  OrderRepository,
  OrderStatus,
  ProductRepository,
} from '@pedido-express/core';
import { Identifier } from '../protocols';
import { ProductsNotFoundError } from '../errors';

export class CreateOrder {
  constructor(
    private readonly identifier: Identifier,
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(input: CreateOrderInput): Promise<Order> {
    const productsFound = await this.productRepository.findAll();
    const productsNotFound = input.orderProducts.filter((product) => {
      return !productsFound.find(
        (productFound) => productFound.id === product.productId,
      );
    });

    if (productsNotFound.length > 0) {
      const productsIds = productsNotFound.map((product) => product.productId);
      throw new ProductsNotFoundError(productsIds);
    }

    const id = this.identifier.generate();
    const now = new Date();
    const createdAt = now;
    const updatedAt = now;
    const status = OrderStatus.Pending;
    const code = Math.random().toString(36).substring(2, 15);
    const orderProducts = new OrderProducts(
      input.orderProducts.map((product) => {
        const productFound = productsFound.find(
          (productFound) => productFound.id === product.productId,
        );
        return new OrderProduct(
          productFound!,
          product.quantity,
          product.observation,
        );
      }),
    );

    const order = new Order(
      id,
      createdAt,
      updatedAt,
      code,
      status,
      orderProducts,
      input.isTakeAway,
      input.customerName,
    );

    return this.orderRepository.create(order);
  }
}

export type CreateOrderInput = {
  customerName: string;
  isTakeAway: boolean;
  orderProducts: {
    productId: string;
    quantity: number;
    observation?: string;
  }[];
};
