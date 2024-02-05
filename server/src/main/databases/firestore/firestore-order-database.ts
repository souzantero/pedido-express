import { Order, OrderRepository, OrderSerializer } from '@pedido-express/core';
import { firestore } from 'firebase-admin';

export class FirestoreOrderDatabase implements OrderRepository {
  constructor(private readonly firestore: firestore.Firestore) {}

  static serialize(
    doc: firestore.DocumentSnapshot<firestore.DocumentData>,
  ): Order {
    return new OrderSerializer({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.createTime?.toDate(),
      updatedAt: doc.updateTime?.toDate(),
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
    return snapshot.docs.map(FirestoreOrderDatabase.serialize);
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
