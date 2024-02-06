import { App } from './app';
import { FirestoreDatabase } from './databases';
import { environment } from './configuration/environment';

const database = FirestoreDatabase.create();
const app = App.create(database);
app.start(environment.port);
