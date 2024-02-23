import { Router } from 'express';
import { Repository } from '@pedido-express/core';
import { adaptRoute } from './route';
import { makeFindManyProductCategoriesHttpController } from '../factories';

export const productCategoryRoutes = (
  router: Router,
  repository: Repository,
) => {
  router.get(
    '/product-categories',
    adaptRoute(makeFindManyProductCategoriesHttpController(repository)),
  );
};
