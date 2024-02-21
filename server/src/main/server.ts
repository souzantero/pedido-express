import { App } from './app';
import { PrismaDatabase } from './databases';
import { environment } from './configuration/environment';

export const server = async () => {
  const database = new PrismaDatabase();
  await database.connect();
  const app = App.create(database);
  return app.start(environment.port);
};
