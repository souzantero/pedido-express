import { Repository } from '@pedido-express/core';
import { ChangeOrderStatus, CreateOrder } from '../../core/application';
import {
  LogHttpControllerDecorator,
  CreateOrderHttpController,
  FindDayOrdersHttpController,
  FindOrderByIdHttpController,
} from '../../core/presentation';
import { UuidAdapter } from '../adapters';
import { ChangeOrderStatusHttpController } from '../../core/presentation/controllers/change-order-status-http-controller';

export const makeCreateOrderHttpController = (repository: Repository) => {
  const identifier = new UuidAdapter();
  const createOrder = new CreateOrder(
    identifier,
    repository.order,
    repository.product,
  );

  return new LogHttpControllerDecorator(
    new CreateOrderHttpController(createOrder),
  );
};

export const makeFindDayOrdersHttpController = (repository: Repository) => {
  return new LogHttpControllerDecorator(
    new FindDayOrdersHttpController(repository.order),
  );
};

export const makeFindOrderByIdHttpController = (repository: Repository) => {
  return new LogHttpControllerDecorator(
    new FindOrderByIdHttpController(repository.order),
  );
};

export const makeChangeOrderStatusHttpController = (repository: Repository) => {
  const changeOrderStatus = new ChangeOrderStatus(
    repository.order,
    repository.order,
  );
  return new LogHttpControllerDecorator(
    new ChangeOrderStatusHttpController(changeOrderStatus),
  );
};
