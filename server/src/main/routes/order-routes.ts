import { Router } from 'express';
import { Repository } from '@pedido-express/core';
import { adaptRoute } from './route';
import {
  makeCreateOrderHttpController,
  makeFindPendingOrdersHttpController,
  makeFindPreparingOrdersHttpController,
} from '../factories';

export const orderRoutes = (router: Router, repository: Repository) => {
  router.post('/orders', adaptRoute(makeCreateOrderHttpController(repository)));
  router.get(
    '/orders/pending',
    adaptRoute(makeFindPendingOrdersHttpController(repository)),
  );
  router.get(
    '/orders/preparing',
    adaptRoute(makeFindPreparingOrdersHttpController(repository)),
  );
};
