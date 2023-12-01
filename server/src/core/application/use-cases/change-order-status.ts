import { FindOrderRepository, Order, OrderProducts, OrderStatus, UpdateOrderRepository, ChangeOrderStatus as UseCase } from '@pedido-express/core'

export class ChangeOrderStatus implements UseCase {
  constructor(
    private readonly findOrderRepository: FindOrderRepository,
    private readonly updateOrderRepository: UpdateOrderRepository
  ) { }

  async changeStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOrderRepository.findById(orderId)
    if (!order) throw new OrderNotFound()
    if (order.status === OrderStatus.Delivered) throw new OrderIsAlreadyDelivered()
    if (order.status === OrderStatus.Canceled) throw new OrderIsAlreadyCanceled()
    if (order.status === status) throw new OrderStatusIsTheSame()

    return this.updateOrderRepository.updateById(orderId, { status })
  }
}

export class OrderNotFound extends Error {
  constructor() {
    super('Order not found')
    this.name = 'OrderNotFound'
  }
}

export class OrderIsAlreadyDelivered extends Error {
  constructor() {
    super('Order is already delivered')
    this.name = 'OrderIsAlreadyDelivered'
  }
}

export class OrderIsAlreadyCanceled extends Error {
  constructor() {
    super('Order is already canceled')
    this.name = 'OrderIsAlreadyCanceled'
  }
}

export class OrderStatusIsTheSame extends Error {
  constructor() {
    super('Order status is the same')
    this.name = 'OrderStatusIsTheSame'
  }
}