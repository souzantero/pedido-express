import {
  FindProductCategoriesRepository,
  ProductCategory,
} from '@pedido-express/domain';

export class InMemoryProductCategoryDatabase
  implements FindProductCategoriesRepository
{
  constructor(private readonly categories: ProductCategory[] = []) {}

  findAll(): Promise<ProductCategory[]> {
    return Promise.resolve(this.categories);
  }
}
