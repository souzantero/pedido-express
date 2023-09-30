import { Client } from "@pedido-express/sdk";
import { OrderService, ProductCategoryService, ProductService, Service } from "../../service";
import { ProductServiceProvider } from "./product-service-provider";
import { ProductCategoryServiceProvider } from "./product-category-service-provider";
import { OrderServiceProvider } from "./order-service-provider";

export class ServiceProvider implements Service {
  order: OrderService;
  product: ProductService;
  productCategory: ProductCategoryService;

  constructor(client: Client) {
    this.order = new OrderServiceProvider(client);
    this.product = new ProductServiceProvider(client);
    this.productCategory = new ProductCategoryServiceProvider(client);
  }
}