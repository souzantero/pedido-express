import { OrderProduct } from "./order-product";

export class OrderProducts extends Array<OrderProduct> {
  constructor(orderProducts: OrderProduct[]) {
    super(...orderProducts);
  }

  get totalPrice(): number {
    return this.reduce((total, orderProduct) => {
      return total + orderProduct.totalPrice;
    }, 0);
  }
}