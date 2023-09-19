import { FC, PropsWithChildren, useMemo } from "react";
import { Banner, Text, useTheme } from "react-native-paper";
import { useOrderBag } from "../hooks";
import { numberToMoney } from "../utilities";

export const OrderBagBanner: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const { orderProducts, totalPrice } = useOrderBag();
  const visible = useMemo(() => orderProducts.length > 0, [orderProducts]);
  const numberOfItems = useMemo(() => orderProducts.length, [orderProducts]);
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
            onPress: () => console.log("Pressed"),
          },
        ]}
      >
        <Text style={{ fontWeight: "bold" }}>{numberToMoney(totalPrice)}</Text>
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
