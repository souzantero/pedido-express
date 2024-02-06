import { FC, PropsWithChildren, createContext, useContext } from "react";
import { Product, ProductCategory } from "@pedido-express/core";
import { Client } from "@pedido-express/sdk";
import {
  InMemoryOrderService,
  InMemoryProductCategoryService,
  InMemoryProductService,
  InMemoryService,
  SDKService,
  Service,
} from "../service";
import { env } from "../config/env";

const productCategories: ProductCategory[] = [
  new ProductCategory("1", new Date(), new Date(), "Salgados"),
  new ProductCategory("2", new Date(), new Date(), "Doces"),
  new ProductCategory("3", new Date(), new Date(), "Bebidas"),
];

const products: Product[] = [
  new Product(
    "1",
    new Date(),
    new Date(),
    "Coxinha",
    "Coxinha de frango",
    5.0,
    productCategories[0].id,
    "https://ribeirao.emporiotartufo.com.br/image/cache/catalog/Irani-Maggiore/125523-COXINHA-FRANGO-SEM-GLUTEN-200G-IRANI-MAGGIORE-a-1000x667.jpg"
  ),
  new Product(
    "2",
    new Date(),
    new Date(),
    "Brigadeiro",
    "Brigadeiro de chocolate",
    2.5,
    productCategories[1].id,
    "https://receitinhas.com.br/wp-content/uploads/2018/05/iStock-874538250-730x365.jpg"
  ),
  new Product(
    "3",
    new Date(),
    new Date(),
    "Coca-Cola",
    "Coca-Cola 350ml",
    4.0,
    productCategories[2].id,
    "https://img.freepik.com/fotos-premium/coca-cola-gelada-com-limao-e-gelo-no-fundo-azul_307993-1.jpg"
  ),
  new Product(
    "4",
    new Date(),
    new Date(),
    "Pastel",
    "Pastel de carne",
    6.0,
    productCategories[0].id,
    "https://thumb-cdn.soluall.net/prod/shp_products/sp1280fw/9fe5a8d0-b70e-4a1c-a78d-f0e9bf1b2b72/d9f357ab-9789-40d0-843f-c112d8cbebf7.png"
  ),
];

// const service: Service = new InMemoryService(
//   new InMemoryProductService(products),
//   new InMemoryProductCategoryService(productCategories),
//   new InMemoryOrderService([], products)
// );

const service = new SDKService(new Client(env.apiUrl));
const ServiceContext = createContext(service);

export const useService = () => useContext(ServiceContext);
export const ServiceContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};
