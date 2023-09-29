import {
  ProductCategory,
  ProductCategoryRepository,
} from '@pedido-express/core';

export class FindProductCategories {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.findAll();
  }
}
