import { Router } from 'express';
import { Repository } from '@pedido-express/domain';
import { adaptRoute } from './route';
import { makeFindManyProductsHttpController } from '../factories/product-factories';

export const productRoutes = (router: Router, repository: Repository) => {
  router.get(
    '/products',
    adaptRoute(makeFindManyProductsHttpController(repository)),
  );
};
