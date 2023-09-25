import { Router } from 'express';
import { Repository } from '@pedido-express/domain';
import { adaptRoute } from './route';
import { makeFindManyProductCategoriesHttpController } from '../factories/product-category-factories';

export const productCategoryRoutes = (
  router: Router,
  repository: Repository,
) => {
  router.get(
    '/product-categories',
    adaptRoute(makeFindManyProductCategoriesHttpController(repository)),
  );
};
