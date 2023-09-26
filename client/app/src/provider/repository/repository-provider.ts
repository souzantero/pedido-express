import { ProductCategoryRepository, ProductRepository, Repository } from "@pedido-express/domain";
import { RepositoryProductProvider, RepositoryProductCategoryProvider } from ".";
import { Client } from "@pedido-express/sdk";

export class RepositoryProvider implements Repository {
  product: ProductRepository;
  productCategory: ProductCategoryRepository;

  constructor(client: Client) {
    this.product = new RepositoryProductProvider(client);
    this.productCategory = new RepositoryProductCategoryProvider(client);
  }
}