import { PrismaClient } from '@prisma/client';
import {
  Product,
  ProductRepository,
  ProductSerializer,
} from '@pedido-express/core';

export class PrismaProductDatabase implements ProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product
      .findMany({
        where: {
          deletedAt: null,
        },
      })
      .then((products) =>
        products.map((p) => new ProductSerializer(p).serialize()),
      );
  }
}
