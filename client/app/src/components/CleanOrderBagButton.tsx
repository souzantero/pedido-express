import { FC } from "react";
import { IconButton, Tooltip } from "react-native-paper";
import { useOrderBag } from "../context";
import { Navigation } from "../adapter";

export type CleanOrderBagButtonProps = {
  navigation: Navigation;
};
export const CleanOrderBagButton: FC<CleanOrderBagButtonProps> = ({
  navigation,
}) => {
  const orderBag = useOrderBag();
  const disabled = orderBag.orderProducts.length === 0;

  const onPress = () => {
    orderBag.clear();
    navigation.clean("ProductCatalog");
  };

  return (
    <Tooltip title="Limpar Sacola">
      <IconButton
        icon="close"
        selected
        disabled={disabled}
        onPress={!disabled ? onPress : undefined}
      />
    </Tooltip>
  );
};
