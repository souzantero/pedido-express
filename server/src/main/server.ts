import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { App } from './app';
import { FirestoreDatabase } from './databases';
import { environment } from './configuration/environment';

const firebase = initializeApp();
const firestore = getFirestore(firebase);
const database = new FirestoreDatabase(firestore);
const app = App.create(database);
app.start(environment.port);
