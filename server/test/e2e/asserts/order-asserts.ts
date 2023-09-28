import assert, { strictEqual } from 'assert';
import { post } from '../utils/request';

export const shouldCreateANewOrder = async ({ api = '' }) => {
  const endpoint = `${api}/orders`;
  const body = {
    customerName: 'John Doe',
    isTakeAway: false,
    orderProducts: [
      {
        productId: '1',
        quantity: 1,
        observation: 'No onions',
      },
      {
        productId: '2',
        quantity: 2,
      },
    ],
  };

  const { response, data } = await post(endpoint, body);

  strictEqual(response.status, 201, 'Response status should be 201');
  assert(data, 'Response should have a body');
  assert(data.id, 'Response body should have an id');
  assert(data.createdAt, 'Response body should have a createdAt');
  assert(data.updatedAt, 'Response body should have an updatedAt');
  assert(data.code, 'Response body should have the same code');
  strictEqual(
    data.customerName,
    body.customerName,
    'Response body should have the same customerName',
  );
  strictEqual(
    data.isTakeAway,
    body.isTakeAway,
    'Response body should have the same isTakeout',
  );
  assert(data.orderProducts, 'Response body should have orderProducts');
  strictEqual(
    data.orderProducts.length,
    body.orderProducts.length,
    'Response body should have the same number of orderProducts',
  );

  data.orderProducts.forEach((orderProduct: any, index: number) => {
    assert(orderProduct.product, 'Response body should have product');
    strictEqual(
      orderProduct.product.id,
      body.orderProducts[index].productId,
      'Response body should have orderProducts with the same productId',
    );
    strictEqual(
      orderProduct.quantity,
      body.orderProducts[index].quantity,
      'Response body should have orderProducts with the same quantity',
    );
    strictEqual(
      orderProduct.observation,
      body.orderProducts[index].observation,
      'Response body should have orderProducts with the same observation',
    );
    assert(
      orderProduct.product,
      'Response body should have orderProducts with product',
    );
    assert(
      orderProduct.product.id,
      'Response body should have orderProducts with product with id',
    );
    assert(
      orderProduct.product.createdAt,
      'Response body should have orderProducts with product with createdAt',
    );
    assert(
      orderProduct.product.updatedAt,
      'Response body should have orderProducts with product with updatedAt',
    );
    assert(
      orderProduct.product.name,
      'Response body should have orderProducts with product with name',
    );
    assert(
      orderProduct.product.description,
      'Response body should have orderProducts with product with description',
    );
    assert(
      orderProduct.product.price,
      'Response body should have orderProducts with product with price',
    );
    assert(
      orderProduct.product.displayImageSource,
      'Response body should have orderProducts with product with displayImageSource',
    );
    assert(
      orderProduct.product.categoryId,
      'Response body should have orderProducts with product with categoryId',
    );
  });
};
