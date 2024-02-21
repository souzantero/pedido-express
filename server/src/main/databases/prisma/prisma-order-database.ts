import { PrismaClient } from '@prisma/client';
import {
  Order,
  OrderRepository,
  OrderSerializer,
  UpdateOrderData,
} from '@pedido-express/core';

export class PrismaOrderDatabase implements OrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  create({ orderProducts, ...order }: Order): Promise<Order> {
    return this.prisma.order
      .create({
        data: {
          ...order,
          orderProducts: {
            create: [...orderProducts].map((op) => ({
              quantity: op.quantity,
              observation: op.observation,
              product: {
                connect: {
                  id: op.product.id,
                },
              },
            })),
          },
        },
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      })
      .then((order) => new OrderSerializer(order).serialize());
  }

  findDayOrders(): Promise<Order[]> {
    return this.prisma.order
      .findMany({
        where: {
          deletedAt: null,
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      })
      .then((orders) => orders.map((o) => new OrderSerializer(o).serialize()));
  }

  findById(orderId: string): Promise<Order | null> {
    return this.prisma.order
      .findUnique({
        where: {
          deletedAt: null,
          id: orderId,
        },
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      })
      .then((order) => (order ? new OrderSerializer(order).serialize() : null));
  }

  updateById(orderId: string, data: UpdateOrderData): Promise<Order> {
    return this.prisma.order
      .update({
        where: {
          id: orderId,
        },
        data: {
          status: data.status,
        },
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      })
      .then((order) => new OrderSerializer(order).serialize());
  }
}
