import assert, { deepEqual, strictEqual } from 'assert';
import { get } from '../utils/request';

export const shouldReturnAListOfProductCategories = async ({ api = '' }) => {
  const { response, data } = await get(`${api}/product-categories`);

  strictEqual(response.status, 200, 'Response status should be 200');
  assert(data, 'Response should have a body');
  deepEqual(data, [], 'Response body should be an empty array');
};
