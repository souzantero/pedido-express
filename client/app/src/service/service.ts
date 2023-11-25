import { ChangeOrderStatus, CreateOrder, FindOrderRepository, FindOrdersRepository, FindProductCategories, FindProducts } from "@pedido-express/core";

export interface Service {
  order: OrderService
  product: ProductService
  productCategory: ProductCategoryService
}

export type OrderService = ChangeOrderStatus & CreateOrder & FindOrderRepository & FindOrdersRepository
export type ProductService = FindProducts
export type ProductCategoryService = FindProductCategories