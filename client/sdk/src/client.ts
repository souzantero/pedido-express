import { OrderProvider, ProductCategoryProvider, ProductProvider, Provider } from "./provider";

export class Client {
  public readonly order: OrderProvider = new OrderProvider(new Provider(this.hostAddress))
  public readonly product: ProductProvider = new ProductProvider(new Provider(this.hostAddress))
  public readonly productCategory: ProductCategoryProvider = new ProductCategoryProvider(new Provider(this.hostAddress))

  constructor(
    private readonly hostAddress: string
  ) { }
}