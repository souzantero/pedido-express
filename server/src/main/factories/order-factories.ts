import { Repository } from '@pedido-express/core';
import { CreateOrder } from '../../core/application';
import {
  CatchErrorHttpControllerDecorator,
  CreateOrderHttpController,
  FindDayOrdersHttpController,
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

export const makeFindDayOrdersHttpController = (repository: Repository) => {
  return new CatchErrorHttpControllerDecorator(
    new FindDayOrdersHttpController(repository.order),
  );
};
