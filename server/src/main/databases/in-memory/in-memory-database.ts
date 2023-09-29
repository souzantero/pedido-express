import {
  OrderRepository,
  ProductCategoryRepository,
  ProductRepository,
  Repository,
} from '@pedido-express/core';
import {
  InMemoryOrderDatabase,
  InMemoryProductDatabase,
  InMemoryProductCategoryDatabase,
} from './';

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export class InMemoryDatabase implements Repository {
  order: OrderRepository = new InMemoryOrderDatabase();
  product: ProductRepository = new InMemoryProductDatabase();
  productCategory: ProductCategoryRepository =
    new InMemoryProductCategoryDatabase();

  drop(): void {
    this.product = new InMemoryProductDatabase();
    this.productCategory = new InMemoryProductCategoryDatabase();
  }
}
