import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ChangeOrderStatusHttpController } from './change-order-status-http-controller';
import { ChangeOrderStatus, Order, OrderStatus } from '@pedido-express/core';
import { BadRequestError, NotFoundError } from './http-controller';
import {
  OrderIsAlreadyCanceled,
  OrderIsAlreadyDelivered,
  OrderNotFound,
  OrderStatusIsTheSame,
} from '../../application/use-cases/change-order-status';

describe('ChangeOrderStatusHttpController', () => {
  it('should return 200 status', async () => {
    // Arrange
    const changeOrderStatus: ChangeOrderStatus = {
      async changeStatus() {
        return {} as Order;
      },
    };

    // Act
    const controller = new ChangeOrderStatusHttpController(changeOrderStatus);
    const response = await controller.handle({
      body: {
        status: OrderStatus.Preparing,
      },
      params: {},
      query: {},
    });

    // Assert
    assert.strictEqual(response.status, 200);
  });

  it('should return use case response as body', async () => {
    // Arrange
    const order = { id: Date.now().toString() } as Order;
    const changeOrderStatus: ChangeOrderStatus = {
      async changeStatus() {
        return order;
      },
    };

    // Act
    const controller = new ChangeOrderStatusHttpController(changeOrderStatus);
    const response = await controller.handle({
      body: {
        status: OrderStatus.Preparing,
      },
      params: {},
      query: {},
    });

    // Assert
    assert.strictEqual(response.body, order);
  });

  it('should pass status and orderId as argument', async () => {
    // Arrange
    const orderId = '1';
    const status = OrderStatus.Preparing;
    const body = { status };
    const params = { orderId };
    const query = {};
    const changeOrderStatus: ChangeOrderStatus = {
      async changeStatus(orderId: string, status: OrderStatus) {
        return {
          id: orderId,
          status,
        } as Order;
      },
    };

    // Act
    const controller = new ChangeOrderStatusHttpController(changeOrderStatus);
    const response = await controller.handle({
      body,
      params,
      query,
    });

    // Assert
    assert.deepEqual(response.body, {
      id: orderId,
      status,
    });
  });

  it('should throw bad request if status is not provided', () => {
    // Arrange
    const orderId = '1';
    const body = {};
    const params = { orderId };
    const query = {};
    const changeOrderStatus: ChangeOrderStatus = {
      async changeStatus(orderId: string, status: OrderStatus) {
        return {
          id: orderId,
          status,
        } as Order;
      },
    };

    // Act
    const controller = new ChangeOrderStatusHttpController(changeOrderStatus);
    const promise = controller.handle({
      body,
      params,
      query,
    });

    // Assert
    return assert.rejects(promise, new BadRequestError('Missing status'));
  });

  it('should throw bad request if status is not valid', () => {
    // Arrange
    const orderId = '1';
    const body = { status: 'invalid' };
    const params = { orderId };
    const query = {};
    const changeOrderStatus: ChangeOrderStatus = {
      async changeStatus(orderId: string, status: OrderStatus) {
        return {
          id: orderId,
          status,
        } as Order;
      },
    };

    // Act
    const controller = new ChangeOrderStatusHttpController(changeOrderStatus);
    const promise = controller.handle({
      body,
      params,
      query,
    });

    // Assert
    return assert.rejects(promise, new BadRequestError('Invalid status'));
  });

  it('should throw not found if order does not exist', () => {
    // Arrange
    const orderId = '1';
    const body = { status: OrderStatus.Preparing };
    const params = { orderId };
    const query = {};
    const changeOrderStatus: ChangeOrderStatus = {
      async changeStatus() {
        throw new OrderNotFound();
      },
    } as ChangeOrderStatus;

    // Act
    const controller = new ChangeOrderStatusHttpController(changeOrderStatus);
    const promise = controller.handle({
      body,
      params,
      query,
    });

    // Assert
    return assert.rejects(promise, new NotFoundError('Order not found'));
  });

  it('should throw bad request if order is already delivered', () => {
    // Arrange
    const orderId = '1';
    const body = { status: OrderStatus.Preparing };
    const params = { orderId };
    const query = {};
    const changeOrderStatus: ChangeOrderStatus = {
      async changeStatus() {
        throw new OrderIsAlreadyDelivered();
      },
    } as ChangeOrderStatus;

    // Act
    const controller = new ChangeOrderStatusHttpController(changeOrderStatus);
    const promise = controller.handle({
      body,
      params,
      query,
    });

    // Assert
    return assert.rejects(
      promise,
      new BadRequestError('Order is already delivered'),
    );
  });

  it('should throw bad request if order is already canceled', () => {
    // Arrange
    const orderId = '1';
    const body = { status: OrderStatus.Preparing };
    const params = { orderId };
    const query = {};
    const changeOrderStatus: ChangeOrderStatus = {
      async changeStatus() {
        throw new OrderIsAlreadyCanceled();
      },
    } as ChangeOrderStatus;

    // Act
    const controller = new ChangeOrderStatusHttpController(changeOrderStatus);
    const promise = controller.handle({
      body,
      params,
      query,
    });

    // Assert
    return assert.rejects(
      promise,
      new BadRequestError('Order is already canceled'),
    );
  });

  it('should throw bad request if order status is the same', () => {
    // Arrange
    const orderId = '1';
    const body = { status: OrderStatus.Preparing };
    const params = { orderId };
    const query = {};
    const changeOrderStatus: ChangeOrderStatus = {
      async changeStatus() {
        throw new OrderStatusIsTheSame();
      },
    } as ChangeOrderStatus;

    // Act
    const controller = new ChangeOrderStatusHttpController(changeOrderStatus);
    const promise = controller.handle({
      body,
      params,
      query,
    });

    // Assert
    return assert.rejects(
      promise,
      new BadRequestError('Order status is the same'),
    );
  });
});
