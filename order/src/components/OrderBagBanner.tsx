import { FC, PropsWithChildren, useMemo } from "react";
import { Banner } from "react-native-paper";
import { useOrderBag } from "../hooks";

export const OrderBagBanner: FC<PropsWithChildren> = ({ children }) => {
  const { orderProducts } = useOrderBag();
  const visible = useMemo(() => orderProducts.length > 0, [orderProducts]);
  return (
    <>
      {children}
      <Banner visible={visible}>
        Você tem {orderProducts.length} produto(s) no seu pedido
      </Banner>
    </>
  );
};
