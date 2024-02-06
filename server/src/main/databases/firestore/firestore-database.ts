import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import {
  OrderRepository,
  ProductCategoryRepository,
  ProductRepository,
  Repository,
} from '@pedido-express/core';
import { FirestoreOrderDatabase } from './firestore-order-database';
import { FirestoreProductDatabase } from './firestore-product-database';
import { FirestoreProductCategoryDatabase } from './firestore-product-category-database';

export class FirestoreDatabase implements Repository {
  order: OrderRepository;
  product: ProductRepository;
  productCategory: ProductCategoryRepository;

  private constructor(private readonly firestore: FirebaseFirestore.Firestore) {
    this.order = new FirestoreOrderDatabase(firestore);
    this.product = new FirestoreProductDatabase(firestore);
    this.productCategory = new FirestoreProductCategoryDatabase(firestore);
  }

  static create(): FirestoreDatabase {
    const firebase = initializeApp();
    const firestore = getFirestore(firebase);
    firestore.settings({ ignoreUndefinedProperties: true });
    return new FirestoreDatabase(firestore);
  }
}
