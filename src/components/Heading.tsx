import React from "react";
import { Text, StyleProp, TextStyle, TextProps, ViewStyle } from "react-native";
import { scale } from "react-native-size-matters";
import Separator from "./Separator";
import colors from "../config/colors";

interface HeadingProps extends TextProps {
  children: React.ReactNode;
  size?: number;
  color?: keyof typeof colors;
  align?: "auto" | "left" | "right" | "center";
  style?: StyleProp<TextStyle>;
  topSpace?: number;
  bottomSpace?: number;
  topStyle?: StyleProp<ViewStyle>;
  bottomStyle?: StyleProp<ViewStyle>;
  bold?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  size = 16,
  bold = false,
  color = "primaryText",
  align = "left",
  style,
  topStyle,
  bottomStyle,
  topSpace,
  bottomSpace,
  ...props
}) => {
  return (
    <>
      {topSpace && <Separator height={topSpace} style={topStyle} />}
      <Text
        style={[
          {
            color: colors[color],
            fontSize: scale(size),
            textAlign: align,
            fontFamily: bold ? "PoppinsXBold" : "PoppinsBold",
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
      {bottomSpace && <Separator height={bottomSpace} style={bottomStyle} />}
    </>
  );
};

export default Heading;
