import { ProductCategoryProvider, ProductProvider } from "./provider";

export class Client {
  public readonly product: ProductProvider = new ProductProvider(this.hostAddress)
  public readonly productCategory: ProductCategoryProvider = new ProductCategoryProvider(this.hostAddress)

  constructor(
    private readonly hostAddress: string
  ) { }
}