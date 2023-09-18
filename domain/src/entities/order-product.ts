import { Order } from "./order";
import { Product } from "./product";

export interface OrderProduct {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  observation?: string;

  order?: Order;
  product?: Product;
}