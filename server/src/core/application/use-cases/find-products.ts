import { Product, ProductRepository } from '@pedido-express/domain';

export class FindProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
