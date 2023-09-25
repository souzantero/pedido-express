import { Repository } from '@pedido-express/domain';
import { FindProducts } from '../../core/application';
import {
  CatchErrorHttpControllerDecorator,
  FindManyProductsHttpController,
} from '../../core/presentation';

export const makeFindManyProductsHttpController = (repository: Repository) => {
  return new CatchErrorHttpControllerDecorator(
    new FindManyProductsHttpController(new FindProducts(repository.product)),
  );
};
