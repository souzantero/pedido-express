import { Router } from 'express';
import { Repository } from '@pedido-express/core';
import { adaptRoute } from './route';
import { makeCreateOrderHttpController } from '../factories';

export const orderRoutes = (router: Router, repository: Repository) => {
  router.post('/orders', adaptRoute(makeCreateOrderHttpController(repository)));
};
