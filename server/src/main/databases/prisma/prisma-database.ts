import { PrismaClient } from '@prisma/client';
import {
  OrderRepository,
  ProductCategoryRepository,
  ProductRepository,
  Repository,
} from '@pedido-express/core';
import { PrismaOrderDatabase } from './prisma-order-database';
import { PrismaProductDatabase } from './prisma-product-database';
import { PrismaProductCategoryDatabase } from './prisma-product-category-database';

export class PrismaDatabase implements Repository {
  private readonly prisma: PrismaClient = new PrismaClient();

  public readonly order: OrderRepository = new PrismaOrderDatabase(this.prisma);
  public readonly product: ProductRepository = new PrismaProductDatabase(
    this.prisma,
  );
  public readonly productCategory: ProductCategoryRepository =
    new PrismaProductCategoryDatabase(this.prisma);

  connect(): Promise<void> {
    return this.prisma.$connect();
  }

  disconnect(): Promise<void> {
    return this.prisma.$disconnect();
  }
}
