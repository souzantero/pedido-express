import { PrismaClient } from '@prisma/client';
import {
  ProductCategory,
  ProductCategoryRepository,
  ProductCategorySerializer,
} from '@pedido-express/core';

export class PrismaProductCategoryDatabase
  implements ProductCategoryRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  findAll(): Promise<ProductCategory[]> {
    return this.prisma.productCategory
      .findMany({
        where: {
          deletedAt: null,
        },
      })
      .then((productCategories) => {
        return productCategories.map((pc) =>
          new ProductCategorySerializer(pc).serialize(),
        );
      });
  }
}
