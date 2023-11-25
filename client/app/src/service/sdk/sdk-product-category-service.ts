import { ProductCategory } from "@pedido-express/core";
import { Client } from "@pedido-express/sdk";
import { ProductCategoryService } from "..";

export class SDKProductCategoryService implements ProductCategoryService {
  constructor(
    private readonly client: Client
  ) { }

  findAll(): Promise<ProductCategory[]> {
    return this.client.productCategory.findAll();
  }
}