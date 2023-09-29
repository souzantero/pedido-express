import { Client } from "@pedido-express/sdk";
import { ProductCategoryService, ProductService, Service } from "../../service";
import { ProductServiceProvider } from "./product-service-provider";
import { ProductCategoryServiceProvider } from "./product-category-service-provider";

export class ServiceProvider implements Service {
  product: ProductService;
  productCategory: ProductCategoryService;

  constructor(client: Client) {
    this.product = new ProductServiceProvider(client);
    this.productCategory = new ProductCategoryServiceProvider(client);
  }
}