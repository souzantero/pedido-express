import { FindProductsRepository, Product } from '@pedido-express/domain';

export class InMemoryProductDatabase implements FindProductsRepository {
  private readonly products: Product[] = [];

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
}
