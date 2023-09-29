import { Product, ProductRepository } from '@pedido-express/core';

export class FindProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
