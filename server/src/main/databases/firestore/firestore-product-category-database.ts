import {
  ProductCategory,
  ProductCategoryRepository,
  ProductCategorySerializer,
} from '@pedido-express/core';
import { firestore } from 'firebase-admin';

export class FirestoreProductCategoryDatabase
  implements ProductCategoryRepository
{
  constructor(private readonly firestore: firestore.Firestore) {}

  async findAll(): Promise<ProductCategory[]> {
    const snapshot = await this.firestore
      .collection('product-categories')
      .get();
    return snapshot.docs.map((doc) =>
      new ProductCategorySerializer({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.createTime?.toDate(),
        updatedAt: doc.updateTime?.toDate(),
      }).serialize(),
    );
  }
}
