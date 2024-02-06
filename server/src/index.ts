import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { App } from './main/app';
import { FirestoreDatabase } from './main/databases';

const firebase = initializeApp();
const firestore = getFirestore(firebase);
const database = new FirestoreDatabase(firestore);
const app = App.create(database);

export const api = onRequest(app.express);
