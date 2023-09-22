import { FC } from "react";
import { useOrderBag } from "../context";
import { IconButton, Tooltip } from "react-native-paper";

export type CleanOrderBagButtonProps = {
  navigation: any;
};
export const CleanOrderBagButton: FC<CleanOrderBagButtonProps> = ({
  navigation,
}) => {
  const orderBag = useOrderBag();
  const disabled = orderBag.order.orderProducts.length === 0;

  const onPress = () => {
    orderBag.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "ProductCatalog" }],
    });
  };

  return (
    <Tooltip title="Limpar Sacola">
      <IconButton icon="close" selected disabled={disabled} onPress={onPress} />
    </Tooltip>
  );
};
