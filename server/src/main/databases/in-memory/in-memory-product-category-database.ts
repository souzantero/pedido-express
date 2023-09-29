import {
  FindProductCategoriesRepository,
  ProductCategory,
} from '@pedido-express/core';

export class InMemoryProductCategoryDatabase
  implements FindProductCategoriesRepository
{
  constructor(
    private readonly categories: ProductCategory[] = [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Hot-dogs',
      },
      {
        id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Burgers',
      },
      {
        id: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Drinks',
      },
    ],
  ) {}

  findAll(): Promise<ProductCategory[]> {
    return Promise.resolve(this.categories);
  }
}
