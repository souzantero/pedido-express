import {
  Product,
  ProductRepository,
  ProductSerializer,
} from '@pedido-express/core';
import { firestore } from 'firebase-admin';

export class FirestoreProductDatabase implements ProductRepository {
  constructor(private readonly firestore: firestore.Firestore) {}

  async findAll(): Promise<Product[]> {
    const snapshot = await this.firestore.collection('products').get();
    return snapshot.docs.map((doc) =>
      new ProductSerializer({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.createTime?.toDate(),
        updatedAt: doc.updateTime?.toDate(),
        categoryId: doc.data().category.id,
      }).serialize(),
    );
  }
}
