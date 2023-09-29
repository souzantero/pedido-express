import { ProductCategory } from '@pedido-express/core';
import { FindProductCategories } from '../../application/use-cases';
import { HttpResponse } from './http-controller';

export class FindManyProductCategoriesHttpController {
  constructor(private readonly findProductCategories: FindProductCategories) {}
  async handle(): Promise<HttpResponse<ProductCategory[]>> {
    const productCategories = await this.findProductCategories.findAll();
    return HttpResponse.ok(productCategories);
  }
}
