import { OrderProduct } from "./order-product";

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  orderProducts?: OrderProduct[];
}