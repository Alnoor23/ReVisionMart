import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { verticalScale } from "react-native-size-matters";

interface SeparatorProps {
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const Separator: React.FC<SeparatorProps> = ({ height = 20, style }) => {
  return <View style={[{ height: verticalScale(height) }, style]} />;
};

export default Separator;
