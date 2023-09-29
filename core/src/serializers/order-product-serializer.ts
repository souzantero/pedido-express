import { OrderProduct } from "../entities";
import { ProductSerializer, Serializer } from ".";

export class OrderProductSerializer implements Serializer<OrderProduct> {
  constructor(
    private readonly data: any
  ) { }

  serialize(): OrderProduct {
    const product = new ProductSerializer(this.data.product).serialize();
    return new OrderProduct(
      product,
      parseInt(this.data.quantity, 10),
      this.data.observation
    )
  }
}