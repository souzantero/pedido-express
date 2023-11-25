import { Client } from "@pedido-express/sdk";
import { OrderService, ProductCategoryService, ProductService, Service } from "..";
import { SDKOrderService } from "./sdk-order-service";
import { SDKProductService } from "./sdk-product-service";
import { SDKProductCategoryService } from "./sdk-product-category-service";

export class SDKService implements Service {
  order: OrderService;
  product: ProductService;
  productCategory: ProductCategoryService;

  constructor(client: Client) {
    this.order = new SDKOrderService(client);
    this.product = new SDKProductService(client);
    this.productCategory = new SDKProductCategoryService(client);
  }
}