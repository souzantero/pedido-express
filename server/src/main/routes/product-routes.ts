import { Router } from 'express';
import { Repository } from '@pedido-express/core';
import { adaptRoute } from './route';
import { makeFindManyProductsHttpController } from '../factories';

export const productRoutes = (router: Router, repository: Repository) => {
  router.get(
    '/products',
    adaptRoute(makeFindManyProductsHttpController(repository)),
  );
};
