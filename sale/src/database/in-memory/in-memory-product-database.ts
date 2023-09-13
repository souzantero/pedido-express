import { FindProductsRepository, Product } from '@self/domain'

export class InMemoryProductDatabase implements FindProductsRepository {
  constructor(
    private readonly products: Product[] = [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Hot-dog',
        description: 'A hot-dog with a sausage and some ketchup',
        price: 5,
        categoryId: '1',
      },
      {
        id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Hot-dog with cheese',
        description: 'A hot-dog with a sausage, some ketchup and cheese',
        price: 7,
        categoryId: '1',
      },
      {
        id: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Burger',
        description: 'A burger with a meat and some ketchup',
        price: 10,
        categoryId: '2',
      },
      {
        id: '4',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Burger with cheese',
        description: 'A burger with a meat, some ketchup and cheese',
        price: 12,
        categoryId: '2',
      },
      {
        id: '5',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Burger with bacon',
        description: 'A burger with a meat, some ketchup and bacon',
        price: 15,
        categoryId: '2',
      },
      {
        id: '6',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Veggies burger',
        description: 'A burger with veggies and some ketchup',
        price: 10,
        categoryId: '2',
      },
      {
        id: '7',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Coke',
        description: 'A coke',
        price: 3,
        categoryId: '3',
      },
      {
        id: '8',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Water',
        description: 'A water',
        price: 2,
        categoryId: '3',
      },
      {
        id: '9',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Juice',
        description: 'A juice',
        price: 5,
        categoryId: '3',
      },
      {
        id: '10',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Ice Tea',
        description: 'A ice tea',
        price: 3,
        categoryId: '3',
      },
      {
        id: '11',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Beer',
        description: 'A beer',
        price: 5,
        categoryId: '3',
      }
    ]
  ) { }

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
}