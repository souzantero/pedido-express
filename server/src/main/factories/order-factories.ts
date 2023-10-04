import { Repository } from '@pedido-express/core';
import { CreateOrder, Orders } from '../../core/application';
import {
  CatchErrorHttpControllerDecorator,
  CreateOrderHttpController,
  FindPendingOrdersHttpController,
} from '../../core/presentation';
import { UuidAdapter } from '../adapters';

export const makeCreateOrderHttpController = (repository: Repository) => {
  const identifier = new UuidAdapter();
  const createOrder = new CreateOrder(
    identifier,
    repository.order,
    repository.product,
  );

  return new CatchErrorHttpControllerDecorator(
    new CreateOrderHttpController(createOrder),
  );
};

export const makeFindPendingOrdersHttpController = (repository: Repository) => {
  const orders = new Orders(repository.order);
  return new CatchErrorHttpControllerDecorator(
    new FindPendingOrdersHttpController(orders),
  );
};

export const makeFindPreparingOrdersHttpController = (
  repository: Repository,
) => {
  const orders = new Orders(repository.order);
  return new CatchErrorHttpControllerDecorator(
    new FindPendingOrdersHttpController(orders),
  );
};
