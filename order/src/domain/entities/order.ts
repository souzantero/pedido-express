import { OrderProduct } from "./order-product";

export enum OrderStatus {
  Pending = 'pending', // This is when the order is created, 
  Preparing = 'preparing', // This is when the order is being prepared
  Ready = 'ready', // This is when the order is ready to be picked up
  Finished = 'finished', // This is when the order is picked up
}

export class Order {
  constructor(
    public readonly orderProducts: OrderProduct[] = [],
  ) { }

  get totalPrice(): number {
    return this.orderProducts.reduce((total, orderProduct) => {
      return total + orderProduct.totalPrice;
    }, 0);
  }
}