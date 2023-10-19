import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

export type ListItemProps = {
  index: number;
  length: number;
};
export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({
  index,
  length,
  children,
}) => {
  const margin = 12;
  const marginBottom = index === length - 1 ? margin : 0;
  return (
    <View
      style={{
        marginBottom,
        marginTop: margin,
        marginLeft: margin,
        marginRight: margin,
      }}
    >
      {children}
    </View>
  );
};
