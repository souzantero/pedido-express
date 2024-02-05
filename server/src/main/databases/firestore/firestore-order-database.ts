import { Order, OrderRepository, OrderSerializer } from '@pedido-express/core';
import { firestore } from 'firebase-admin';

export class FirestoreOrderDatabase implements OrderRepository {
  constructor(private readonly firestore: firestore.Firestore) {}

  static async serialize(
    doc: firestore.DocumentSnapshot<firestore.DocumentData>,
  ): Promise<Order> {
    const data = doc.data();
    if (!data) {
      throw new Error('Document does not exist');
    }

    const orderProducts = await Promise.all(
      data.orderProducts.map(async (orderProduct: any) => {
        const product = await orderProduct.product.get();
        return {
          ...orderProduct,
          product: {
            ...product.data(),
            id: product.id,
            createdAt: product.createTime?.toDate(),
            updatedAt: product.updateTime?.toDate(),
          },
        };
      }),
    );

    return new OrderSerializer({
      ...data,
      id: doc.id,
      createdAt: doc.createTime?.toDate(),
      updatedAt: doc.updateTime?.toDate(),
      orderProducts,
    }).serialize();
  }

  async create({
    id,
    createdAt,
    updatedAt,
    orderProducts,
    ...order
  }: Order): Promise<Order> {
    const doc = this.firestore.collection('orders').doc(id);
    await doc.set({
      ...order,
      orderProducts: [...orderProducts].map((orderProduct) => ({
        ...orderProduct,
        product: this.firestore.doc(`products/${orderProduct.product.id}`),
      })),
    });
    const snapshot = await doc.get();
    return FirestoreOrderDatabase.serialize(snapshot);
  }

  async findDayOrders(): Promise<Order[]> {
    const snapshot = await this.firestore.collection('orders').get();
    return Promise.all(snapshot.docs.map(FirestoreOrderDatabase.serialize));
  }

  async findById(orderId: string): Promise<Order | null> {
    const snapshot = await this.firestore
      .collection('orders')
      .doc(orderId)
      .get();
    if (!snapshot.exists) {
      return null;
    }

    return FirestoreOrderDatabase.serialize(snapshot);
  }

  async updateById(
    orderId: string,
    data: Partial<Pick<Order, 'status'>>,
  ): Promise<Order> {
    const doc = this.firestore.collection('orders').doc(orderId);
    await doc.update(data);
    const snapshot = await doc.get();
    return FirestoreOrderDatabase.serialize(snapshot);
  }
}
