import { after, before, beforeEach, describe, it } from 'node:test';
import { Server } from 'node:http';
import { AddressInfo } from 'node:net';

import { App } from '../../src/main/app';
import { InMemoryDatabase } from '../../src/main/databases';
import { shouldReturnAListOfProducts } from './asserts/product-asserts';

const database = new InMemoryDatabase();
const app = App.create(database);

describe('e2e', () => {
  let server: Server;
  let api: string;

  before(() => {
    server = app.start(0);
    const port = (server.address() as AddressInfo).port;
    api = `http://localhost:${port}/api`;
  });

  beforeEach(() => {
    database.drop();
  });

  after(() => {
    server.close();
  });

  describe('GET /products', () => {
    it('should return a list of products', () => shouldReturnAListOfProducts({ api }));
  });
});
