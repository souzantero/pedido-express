import {
  ProductCategory,
  ProductCategoryRepository,
} from '@pedido-express/domain';

export class FindProductCategories {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.findAll();
  }
}
