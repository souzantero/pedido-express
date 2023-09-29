import { Order } from "../entities";

export interface CreateOrder {
  create(input: CreateOrderInput): Promise<Order>
}

export type CreateOrderInput = {
  customerName: string;
  isTakeAway: boolean;
  orderProducts: {
    productId: string;
    quantity: number;
    observation?: string;
  }[];
};
