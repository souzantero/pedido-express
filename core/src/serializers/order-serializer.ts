import { Order, OrderProducts, OrderStatus } from "../entities";
import { OrderProductSerializer, Serializer } from ".";

export class OrderSerializer implements Serializer<Order> {
  constructor(
    private readonly data: any
  ) { }

  serialize(): Order {
    const orderProductList = this.data.orderProducts.map((orderProduct: any) => new OrderProductSerializer(orderProduct).serialize());
    const orderProducts = new OrderProducts(orderProductList);
    return new Order(
      this.data.id,
      new Date(this.data.createdAt),
      new Date(this.data.updatedAt),
      this.data.code,
      this.getOrderStatus(this.data.status),
      orderProducts,
      this.data.isTakeAway,
      this.data.customerName
    )
  }

  private getOrderStatus(status: string): OrderStatus {
    switch (status) {
      case 'PENDING':
        return OrderStatus.Pending
      case 'PREPARING':
        return OrderStatus.Preparing
      case 'READY':
        return OrderStatus.Ready
      case 'DELIVERED':
        return OrderStatus.Delivered
      case 'CANCELED':
        return OrderStatus.Canceled
      default:
        throw new Error(`Unknown status: ${status}`)
    }
  }
}