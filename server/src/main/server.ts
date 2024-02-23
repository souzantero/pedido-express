import { App } from './app';
import { environment } from './configuration/environment';
import { makeRepository } from './factories';

export const server = async () => {
  const database = await makeRepository();
  const app = App.create(database);
  return app.start(environment.port);
};
