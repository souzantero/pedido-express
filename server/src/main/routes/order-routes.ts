import { Router } from 'express';
import { Repository } from '@pedido-express/core';
import { adaptRoute } from './route';
import {
  makeCreateOrderHttpController,
  makeFindDayOrdersHttpController,
} from '../factories';

export const orderRoutes = (router: Router, repository: Repository) => {
  router.post('/orders', adaptRoute(makeCreateOrderHttpController(repository)));
  router.get(
    '/orders/of-the-day',
    adaptRoute(makeFindDayOrdersHttpController(repository)),
  );
};
