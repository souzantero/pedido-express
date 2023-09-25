import assert, { deepEqual, strictEqual } from 'node:assert';
import { get } from '../utils/request';

export const shouldReturnAListOfProducts = async ({ api = '' }) => {
  const { response, data } = await get(`${api}/products`);

  strictEqual(response.status, 200, 'Response status should be 200');
  assert(data, 'Response should have a body');
  deepEqual(data, [], 'Response body should be an empty array');
};
