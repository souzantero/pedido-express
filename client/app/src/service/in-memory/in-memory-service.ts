import { Product, CreateOrderInput, Order, ProductCategory, OrderStatus, OrderProducts, OrderProduct } from "@pedido-express/core";
import { OrderService, ProductCategoryService, ProductService, Service } from "../service";

export class InMemoryService implements Service {
  constructor(
    public readonly product: ProductService = new InMemoryProductService(),
    public readonly productCategory: ProductCategoryService = new InMemoryProductCategoryService(),
    public readonly order: OrderService = new InMemoryOrderService(),
  ) { }
}

export class InMemoryProductService implements ProductService {
  constructor(
    private readonly products: Product[] = []
  ) { }

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
}

export class InMemoryProductCategoryService implements ProductCategoryService {
  constructor(
    private readonly productCategories: ProductCategory[] = []
  ) { }

  findAll(): Promise<ProductCategory[]> {
    return Promise.resolve(this.productCategories);
  }
}

export class InMemoryOrderService implements OrderService {
  constructor(
    private readonly orders: Order[] = [],
    private readonly products: Product[] = [],
  ) { }

  create(input: CreateOrderInput): Promise<Order> {
    const id = Math.random().toString();
    const createdAt = new Date();
    const updatedAt = createdAt;
    const code = Math.random().toString().substr(2, 6).toUpperCase();
    const status = OrderStatus.Pending;
    const orderProductList = input.orderProducts.map(orderProduct => new OrderProduct(
      this.products.find(product => product.id === orderProduct.productId)!,
      orderProduct.quantity,
      orderProduct.observation,
    ));

    const orderProducts = new OrderProducts(orderProductList);

    const order = new Order(
      id,
      createdAt,
      updatedAt,
      code,
      status,
      orderProducts,
      input.isTakeAway,
      input.customerName,
    );

    this.orders.push(order);

    return Promise.resolve(order);
  }

  findDayOrders(): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.orders);
      }, 1000);
    });
  }
}
