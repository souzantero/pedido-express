import { Product, ProductRepository } from "@pedido-express/domain";

export class ProductProvider implements ProductRepository {
  constructor(
    private readonly hostAddress: string
  ) { }

  async findAll(): Promise<Product[]> {
    const response = await fetch(`${this.hostAddress}/products`)
    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return body.map(this.toEntity)
  }

  private toEntity(item: any): Product {
    return {
      id: item.id,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      deletedAt: item.deletedAt && new Date(item.deletedAt),
      name: item.name,
      description: item.description,
      price: parseFloat(item.price),
      displayImageSource: item.displayImageSource,
      categoryId: item.categoryId,
    }
  }
}