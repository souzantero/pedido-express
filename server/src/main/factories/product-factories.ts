import { Repository } from '@pedido-express/core';
import { FindProducts } from '../../core/application';
import {
  LogHttpControllerDecorator,
  FindManyProductsHttpController,
} from '../../core/presentation';

export const makeFindManyProductsHttpController = (repository: Repository) => {
  return new LogHttpControllerDecorator(
    new FindManyProductsHttpController(new FindProducts(repository.product)),
  );
};
