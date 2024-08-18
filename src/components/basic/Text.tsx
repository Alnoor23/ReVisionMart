import React from "react";
import {
  Text as RnText,
  StyleProp,
  TextStyle,
  TextProps as RnTextProps,
  ViewStyle,
} from "react-native";
import { scale } from "react-native-size-matters";
import Separator from "./Separator";
import colors from "../../config/colors";

interface TextProps extends RnTextProps {
  children: React.ReactNode;
  size?: number;
  color?: keyof typeof colors;
  align?: "auto" | "left" | "right" | "center";
  style?: StyleProp<TextStyle>;
  topSpace?: number;
  bottomSpace?: number;
  topStyle?: StyleProp<ViewStyle>;
  bottomStyle?: StyleProp<ViewStyle>;
  decoration?: "none" | "underline" | "line-through" | "underline line-through";
}

const Text: React.FC<TextProps> = ({
  children,
  size = 14,
  color = "primaryText",
  align = "left",
  style,
  topStyle,
  bottomStyle,
  topSpace,
  bottomSpace,
  decoration = "none",
  ...props
}) => {
  return (
    <>
      {topSpace && <Separator height={topSpace} style={topStyle} />}
      <RnText
        style={[
          {
            color: colors[color],
            fontSize: scale(size),
            textAlign: align,
            fontFamily: "Poppins",
            textDecorationLine: decoration,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </RnText>
      {bottomSpace && <Separator height={bottomSpace} style={bottomStyle} />}
    </>
  );
};

export default Text;
