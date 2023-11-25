import { ChangeOrderStatus, CreateOrder, FindOrdersRepository, FindProductCategories, FindProducts } from "@pedido-express/core";

export interface Service {
  order: OrderService
  product: ProductService
  productCategory: ProductCategoryService
}

export type OrderService = ChangeOrderStatus & CreateOrder & FindOrdersRepository
export type ProductService = FindProducts
export type ProductCategoryService = FindProductCategories