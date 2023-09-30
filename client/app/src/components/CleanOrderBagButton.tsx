import { FC } from "react";
import { IconButton, Tooltip } from "react-native-paper";
import { useOrderBag } from "../context";
import { Navigator } from "../adapter";

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

    new Navigator(navigation).reset();
  };

  return (
    <Tooltip title="Limpar Sacola">
      <IconButton icon="close" selected disabled={disabled} onPress={onPress} />
    </Tooltip>
  );
};
