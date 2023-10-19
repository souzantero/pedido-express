import { FC } from "react";
import { IconButton, Tooltip } from "react-native-paper";
import { useDayOrders } from "../context";

export const RefreshDayOrdersButton: FC = () => {
  const { findDayOrders, isLoadingOrders } = useDayOrders();

  return (
    <Tooltip title="Atualizar Pedidos">
      <IconButton
        icon="refresh"
        selected
        onPress={findDayOrders}
        disabled={isLoadingOrders}
      />
    </Tooltip>
  );
};
