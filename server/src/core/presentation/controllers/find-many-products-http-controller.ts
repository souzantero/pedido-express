import { Product } from '@pedido-express/domain';
import { FindProducts } from '../../application/use-cases';
import { HttpResponse } from './http-controller';

export class FindManyProductsHttpController {
  constructor(private readonly findProducts: FindProducts) {}
  async handle(): Promise<HttpResponse<Product[]>> {
    const products = await this.findProducts.findAll();
    return HttpResponse.ok(products);
  }
}
