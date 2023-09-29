import { Repository } from '@pedido-express/core';
import { FindProductCategories } from '../../core/application';
import {
  CatchErrorHttpControllerDecorator,
  FindManyProductCategoriesHttpController,
} from '../../core/presentation';

export const makeFindManyProductCategoriesHttpController = (
  repository: Repository,
) => {
  return new CatchErrorHttpControllerDecorator(
    new FindManyProductCategoriesHttpController(
      new FindProductCategories(repository.productCategory),
    ),
  );
};
