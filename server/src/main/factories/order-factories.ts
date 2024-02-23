import { Order, Repository } from '@pedido-express/core';
import { ChangeOrderStatus, CreateOrder } from '../../core/application';
import {
  LogHttpControllerDecorator,
  CreateOrderHttpController,
  FindDayOrdersHttpController,
  FindOrderByIdHttpController,
} from '../../core/presentation';
import { UuidAdapter } from '../adapters';
import { ChangeOrderStatusHttpController } from '../../core/presentation/controllers/change-order-status-http-controller';
import { OrderCreatedEventHandler } from '../../core/application/events/handlers/order-created-event-handler';
import { OrderCreatedEventEmitter } from '../../core/application/events/order-created-event';

export const makeCreateOrderHttpController = (repository: Repository) => {
  const identifier = new UuidAdapter();

  const orderCreatedEventEmitter = new OrderCreatedEventEmitter();
  orderCreatedEventEmitter.on(new OrderCreatedEventHandler());

  const createOrder = new CreateOrder(
    identifier,
    repository.order,
    repository.product,
    orderCreatedEventEmitter,
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
