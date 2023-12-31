import { OrderProducts } from "./order-products";

export class Order {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly code: string,
    public readonly status: OrderStatus,
    public readonly orderProducts: OrderProducts,
    public readonly isTakeAway: boolean = false,
    public readonly customerName: string = '',
  ) { }

  public get canBeCanceled(): boolean {
    return this.status === OrderStatus.Pending || this.status === OrderStatus.Preparing;
  }

  public get canBePrepared(): boolean {
    return this.status === OrderStatus.Pending;
  }

  public get canBeReady(): boolean {
    return this.status === OrderStatus.Preparing;
  }

  public get canBeDelivered(): boolean {
    return this.status === OrderStatus.Ready;
  }
}

export enum OrderStatus {
  Pending = 'PENDING', // This is when the order is created, 
  Preparing = 'PREPARING', // This is when the order is being prepared
  Ready = 'READY', // This is when the order is ready to be picked up
  Delivered = 'DELIVERED', // This is when the order is picked up
  Canceled = 'CANCELED', // This is when the order is canceled
}