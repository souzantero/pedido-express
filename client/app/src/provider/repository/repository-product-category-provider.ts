import { ProductCategory, ProductCategoryRepository } from "@pedido-express/domain";
import { Client } from "@pedido-express/sdk";

export class RepositoryProductCategoryProvider implements ProductCategoryRepository {
  constructor(
    private readonly client: Client
  ) { }

  findAll(): Promise<ProductCategory[]> {
    return this.client.productCategory.findAll();
  }
}