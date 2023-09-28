import { FindProductsRepository, Product } from '@pedido-express/domain';

export class InMemoryProductDatabase implements FindProductsRepository {
  private readonly products: Product[] = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Hot-dog',
      description: 'A hot-dog with a sausage and some ketchup',
      price: 5,
      displayImageSource:
        'https://www.bandab.com.br/wp-content/uploads/2022/07/357545_original.webp',
      categoryId: '1',
    },
    {
      id: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Hot-dog with cheese',
      description: 'A hot-dog with a sausage, some ketchup and cheese',
      price: 7,
      displayImageSource:
        'https://www.bandab.com.br/wp-content/uploads/2022/07/357545_original.webp',
      categoryId: '1',
    },
    {
      id: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Burger',
      description: 'A burger with a meat and some ketchup',
      price: 10,
      displayImageSource:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
      categoryId: '2',
    },
    {
      id: '4',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Burger with cheese',
      description: 'A burger with a meat, some ketchup and cheese',
      price: 12,
      displayImageSource:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
      categoryId: '2',
    },
    {
      id: '5',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Burger with bacon',
      description: 'A burger with a meat, some ketchup and bacon',
      price: 15,
      displayImageSource:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
      categoryId: '2',
    },
    {
      id: '6',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Veggies burger',
      description: 'A burger with veggies and some ketchup',
      price: 10,
      displayImageSource:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
      categoryId: '2',
    },
    {
      id: '7',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Coke',
      description: 'A coke',
      price: 3,
      displayImageSource:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7xSPyQHHsFrtfkq7lrtTWVHnTDgIsI6KQTQ&usqp=CAU',
      categoryId: '3',
    },
    {
      id: '8',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Water',
      description: 'A water',
      price: 2,
      displayImageSource:
        'https://agedam.files.wordpress.com/2021/04/garrafa-copo-agua-mineral-agedam-rs.jpg',
      categoryId: '3',
    },
    {
      id: '9',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Juice',
      description: 'A juice',
      price: 5,
      displayImageSource:
        'https://www.petz.com.br/blog/wp-content/uploads/2022/07/gato-pode-tomar-suco-de-laranja-2-1280x720.jpg',
      categoryId: '3',
    },
    {
      id: '10',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Ice Tea',
      description: 'A ice tea',
      price: 3,
      displayImageSource:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1sRFnnGFFfgc7StolsWIF_TfV8PS6y9Itwg&usqp=CAU',
      categoryId: '3',
    },
    {
      id: '11',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Beer',
      description: 'A beer',
      price: 5,
      displayImageSource:
        'https://media.gazetadopovo.com.br/2023/01/30093439/cerveja.jpg',
      categoryId: '3',
    },
  ];

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
}
