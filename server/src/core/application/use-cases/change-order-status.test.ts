import { describe, it } from "node:test";
import assert from "node:assert";
import { FindOrderRepository, Order, OrderStatus, UpdateOrderRepository } from "@pedido-express/core";
import { ChangeOrderStatus, OrderNotFound } from "./change-order-status";

const randomString = () => Math.random().toString(36).substring(7);
const runAndCatch = async (fn: () => Promise<unknown>) => {
  let error;
  try {
    await fn();
  } catch (e) {
    error = e as Error;
  }

  return error;
}

const makeUpdateOrderRepository = () => ({
  async updateById(orderId, data) {
    throw new Error("Method not implemented.");
  },
} as UpdateOrderRepository)


describe("ChangeOrderStatus", () => {
  it("should change order status using repository", async () => {
    // Arrange
    const orderId = randomString();
    const status = OrderStatus.Preparing;
    const updatedOrder = {
      id: orderId,
      status,
    } as Order;
    const findOrderRepository = {
      async findById(id) {
        return {
          id,
          status: OrderStatus.Pending,
        } as Order;
      }
    } as FindOrderRepository;
    const updateOrderRepository = {
      async updateById(orderId, data) {
        return updatedOrder;
      }
    } as UpdateOrderRepository;
    const changeOrderStatus = new ChangeOrderStatus(findOrderRepository, updateOrderRepository);

    // Act
    const order = await changeOrderStatus.changeStatus(orderId, status);

    // Assert
    assert.strictEqual(order, updatedOrder);
  })

  it("should throw error when order not found", () => {
    // Arrange
    const orderId = randomString();
    const status = OrderStatus.Preparing;
    const changeOrderStatus = new ChangeOrderStatus({
      async findById(id) {
        return null;
      }
    }, makeUpdateOrderRepository());

    // Act
    const promise = changeOrderStatus.changeStatus(orderId, status);

    // Assert
    assert.rejects(promise, new OrderNotFound());
  });

  it("should throw error when order is already delivered", async () => {
    // Arrange
    const orderId = randomString();
    const status = OrderStatus.Canceled;
    const changeOrderStatus = new ChangeOrderStatus({
      async findById(id) {
        return {
          id,
          status: OrderStatus.Delivered,
        } as Order;
      }
    }, makeUpdateOrderRepository());

    // Act
    const error = await runAndCatch(() => changeOrderStatus.changeStatus(orderId, status));

    // Assert
    assert.notEqual(error, undefined);
    assert.strictEqual(error?.name, 'OrderIsAlreadyDelivered');
    assert.strictEqual(error?.message, 'Order is already delivered');
  })

  it("should throw error when order is already canceled", async () => {
    // Arrange
    const orderId = randomString();
    const status = OrderStatus.Preparing;
    const changeOrderStatus = new ChangeOrderStatus({
      async findById(id) {
        return {
          id,
          status: OrderStatus.Canceled,
        } as Order;
      }
    }, makeUpdateOrderRepository());

    // Act
    const error = await runAndCatch(() => changeOrderStatus.changeStatus(orderId, status));

    // Assert
    assert.notEqual(error, undefined);
    assert.strictEqual(error?.name, 'OrderIsAlreadyCanceled');
    assert.strictEqual(error?.message, 'Order is already canceled');
  })

  it("should throw error when status is the same", async () => {
    // Arrange
    const orderId = randomString();
    const status = OrderStatus.Pending;
    const changeOrderStatus = new ChangeOrderStatus({
      async findById(id) {
        return {
          id,
          status: OrderStatus.Pending,
        } as Order;
      }
    }, makeUpdateOrderRepository());

    // Act
    const error = await runAndCatch(() => changeOrderStatus.changeStatus(orderId, status));

    // Assert
    assert.notEqual(error, undefined);
    assert.strictEqual(error?.name, 'OrderStatusIsTheSame');
    assert.strictEqual(error?.message, 'Order status is the same');
  })
});