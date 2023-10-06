import { FC } from "react";
import { IconButton, Tooltip } from "react-native-paper";
import { useOrderBag } from "../context";
import { Navigation } from "../adapter";

export type CancelOrderButtonProps = {
  navigation: Navigation;
};
export const CancelOrderButton: FC<CancelOrderButtonProps> = ({
  navigation,
}) => {
  const orderBag = useOrderBag();
  const onPress = () => {
    orderBag.clear();
    navigation.clean("StartOrder");
  };

  return (
    <Tooltip title="Cancelar Pedido">
      <IconButton icon="close" selected onPress={onPress} />
    </Tooltip>
  );
};
