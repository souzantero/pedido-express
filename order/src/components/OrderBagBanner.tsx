import { FC, PropsWithChildren, useMemo } from "react";
import { Banner, Text, useTheme } from "react-native-paper";
import { useOrderBag } from "../context";
import { numberToCurrency } from "../utilities";

export type OrderBagBannerProps = {
  onOrderBagPress?: () => void;
};

export const OrderBagBanner: FC<PropsWithChildren<OrderBagBannerProps>> = ({
  onOrderBagPress,
  children,
}) => {
  const theme = useTheme();
  const { order } = useOrderBag();
  const visible = useMemo(
    () => order.orderProducts.length > 0,
    [order.orderProducts]
  );
  const numberOfItems = useMemo(
    () =>
      order.orderProducts.reduce(
        (acc, orderProduct) => acc + orderProduct.quantity,
        0
      ),
    [order.orderProducts]
  );
  const numberOfItemsText = useMemo(
    () => (numberOfItems > 1 ? "itens" : "item"),
    [numberOfItems]
  );

  return (
    <>
      {children}
      <Banner
        visible={visible}
        actions={[
          {
            label: "Ver sacola",
            onPress: onOrderBagPress,
          },
        ]}
      >
        <Text style={{ fontWeight: "bold" }}>
          {numberToCurrency(order.totalPrice)}
        </Text>
        <Text
          style={{
            color: theme.colors.secondary,
          }}
        >
          {` / ${numberOfItems} ${numberOfItemsText}`}
        </Text>
      </Banner>
    </>
  );
};
