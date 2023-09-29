import { FC } from "react";
import { IconButton, Tooltip } from "react-native-paper";
import { useOrderBag } from "../context";

export type CleanOrderBagButtonProps = {
  navigation: any;
};
export const CleanOrderBagButton: FC<CleanOrderBagButtonProps> = ({
  navigation,
}) => {
  const orderBag = useOrderBag();
  const disabled = orderBag.orderProducts.length === 0;

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
