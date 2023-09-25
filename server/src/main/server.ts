import { App } from './app';
import { InMemoryDatabase } from './databases';
import { environment } from './configuration/environment';

const app = App.create(new InMemoryDatabase());
app.start(environment.port);
