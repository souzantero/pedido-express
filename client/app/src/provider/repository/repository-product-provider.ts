import { Product, ProductRepository } from "@pedido-express/domain";
import { Client } from "@pedido-express/sdk";

export class RepositoryProductProvider implements ProductRepository {
  constructor(
    private readonly client: Client
  ) { }

  findAll(): Promise<Product[]> {
    return this.client.product.findAll();
  }
}