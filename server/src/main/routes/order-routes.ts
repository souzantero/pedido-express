import { Router } from 'express';
import { Repository } from '@pedido-express/core';
import { adaptRoute } from './route';
import {
  makeChangeOrderStatusHttpController,
  makeCreateOrderHttpController,
  makeFindDayOrdersHttpController,
  makeFindOrderByIdHttpController,
} from '../factories';

export const orderRoutes = (router: Router, repository: Repository) => {
  router.get(
    '/orders/of-the-day',
    adaptRoute(makeFindDayOrdersHttpController(repository)),
  );
  router.get(
    '/orders/:orderId',
    adaptRoute(makeFindOrderByIdHttpController(repository)),
  );
  router.post('/orders', adaptRoute(makeCreateOrderHttpController(repository)));
  router.put(
    '/orders/:orderId/status',
    adaptRoute(makeChangeOrderStatusHttpController(repository)),
  );
};
