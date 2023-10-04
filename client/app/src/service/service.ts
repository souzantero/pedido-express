import { CreateOrder, FindOrders, FindProductCategories, FindProducts } from "@pedido-express/core";

export interface Service {
  order: OrderService
  product: ProductService
  productCategory: ProductCategoryService
}

export type OrderService = CreateOrder & FindOrders
export type ProductService = FindProducts
export type ProductCategoryService = FindProductCategories