import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useService } from "./service-context";
import { Order } from "@pedido-express/core";

export type DayOrders = {
  orders?: Order[];
  isLoadingOrders: boolean;
  findDayOrders: () => void;
};

export const DayOrdersContext = createContext<DayOrders>({
  orders: undefined,
  isLoadingOrders: false,
  findDayOrders: () => {},
});

export const DayOrdersProvider: FC<PropsWithChildren> = ({ children }) => {
  const service = useService();
  const [orders, setOrders] = useState<Order[]>();
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  const findDayOrders = () => {
    setIsLoadingOrders(true);
    service.order
      .findDayOrders()
      .then(setOrders)
      .finally(() => setIsLoadingOrders(false));
  };

  useEffect(findDayOrders, []);

  const value = useMemo(
    () => ({ orders, isLoadingOrders, findDayOrders }),
    [orders, isLoadingOrders]
  );

  return (
    <DayOrdersContext.Provider value={{ orders, isLoadingOrders, findDayOrders }}>
      {children}
    </DayOrdersContext.Provider>
  );
};

export const useDayOrders = () => useContext(DayOrdersContext);
