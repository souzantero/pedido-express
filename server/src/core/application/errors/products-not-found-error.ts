export class ProductsNotFoundError extends Error {
  constructor(productsIds: string[]) {
    super(`Products not found: ${productsIds.join(', ')}`);
    this.name = 'ProductsNotFoundError';
  }
}
