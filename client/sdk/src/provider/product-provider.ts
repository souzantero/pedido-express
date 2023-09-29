import { FindProducts, Product, ProductSerializer } from "@pedido-express/core";
import { Provider } from "./provider";

export class ProductProvider implements FindProducts {
  constructor(
    private readonly provider: Provider,
  ) { }

  async findAll(): Promise<Product[]> {
    return this.provider.get('/products')
      .then(products => products.map((product: any) => new ProductSerializer(product).serialize()));
  }
}