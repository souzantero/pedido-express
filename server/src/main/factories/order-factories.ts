import { Repository } from '@pedido-express/core';
import { CreateOrder } from '../../core/application';
import {
  CatchErrorHttpControllerDecorator,
  CreateOrderHttpController,
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
