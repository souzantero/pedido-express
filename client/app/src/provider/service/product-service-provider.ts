import { Product } from "@pedido-express/core";
import { Client } from "@pedido-express/sdk";
import { ProductService } from "../../service";

export class ProductServiceProvider implements ProductService {
  constructor(
    private readonly client: Client
  ) { }

  findAll(): Promise<Product[]> {
    return this.client.product.findAll();
  }
}