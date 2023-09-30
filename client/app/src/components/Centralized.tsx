import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

export const Centralized: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
};
