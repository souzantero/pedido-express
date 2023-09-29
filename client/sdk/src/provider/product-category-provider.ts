import { FindProductCategories, ProductCategory, ProductCategorySerializer } from "@pedido-express/core";
import { Provider } from "./provider";

export class ProductCategoryProvider implements FindProductCategories {
  constructor(
    private readonly provider: Provider
  ) { }

  async findAll(): Promise<ProductCategory[]> {
    return this.provider.get('/product-categories')
      .then(productCategories => 
        productCategories.map((productCategory: any) => new ProductCategorySerializer(productCategory).serialize())
      );
  }
}