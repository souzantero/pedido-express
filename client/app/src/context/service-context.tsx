import { FC, PropsWithChildren, createContext, useContext } from "react";
import { ServiceProvider } from "../provider";
import { Client } from "@pedido-express/sdk";

const service = new ServiceProvider(
  new Client("http://192.168.100.4:3000/api")
);

const ServiceContext = createContext(service);

export const useService = () => useContext(ServiceContext);
export const ServiceContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};
