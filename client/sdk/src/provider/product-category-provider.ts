import { ProductCategory, ProductCategoryRepository } from "@pedido-express/domain";

export class ProductCategoryProvider implements ProductCategoryRepository {
  constructor(
    private readonly hostAddress: string
  ) { }

  async findAll(): Promise<ProductCategory[]> {
    const response = await fetch(`${this.hostAddress}/product-categories`)
    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    return body.map(this.toEntity)
  }

  private toEntity(item: any): ProductCategory {
    return {
      id: item.id,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      deletedAt: item.deletedAt && new Date(item.deletedAt),
      name: item.name
    }
  }
}