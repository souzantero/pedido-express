import { onRequest } from 'firebase-functions/v2/https';

import { App } from './main/app';
import { FirestoreDatabase } from './main/databases';

const database = FirestoreDatabase.create();
const app = App.create(database);

export const api = onRequest(app.express);
