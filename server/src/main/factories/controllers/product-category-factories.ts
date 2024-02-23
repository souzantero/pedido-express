import { Repository } from '@pedido-express/core';
import { FindProductCategories } from '../../../core/application';
import {
  LogHttpControllerDecorator,
  FindManyProductCategoriesHttpController,
} from '../../../core/presentation';

export const makeFindManyProductCategoriesHttpController = (
  repository: Repository,
) => {
  return new LogHttpControllerDecorator(
    new FindManyProductCategoriesHttpController(
      new FindProductCategories(repository.productCategory),
    ),
  );
};
