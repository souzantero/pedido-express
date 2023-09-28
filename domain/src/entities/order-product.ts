import { Product } from "./product";

export class OrderProduct {
  constructor(
    public readonly product: Product,
    public readonly quantity: number,
    public readonly observation?: string
  ) { }

  get totalPrice() {
    return this.product.price * this.quantity;
  }

  get key() {
    return `${this.product.id}-${this.observation}`;
  }
}