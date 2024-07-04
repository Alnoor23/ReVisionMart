import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { Input, Separator } from "./basic";
import { scale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const { width } = Dimensions.get("window");

interface SearchInputProps {
  placeholder?: string;
  containerColor?: keyof typeof colors;
  topSpace?: number;
  bottomSpace?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  containerColor = "white",
  topSpace,
  bottomSpace,
}) => {
  return (
    <>
      {topSpace && <Separator height={topSpace} />}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors[containerColor] },
        ]}
      >
        <Input
          borderRadius={26}
          Inputstyle={styles.inputStyle}
          placeholder={placeholder}
        />
        <TouchableOpacity onPress={() => console.log("btn pressed..")}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="magnify"
              color={colors.white}
              size={scale(24)}
            />
          </View>
        </TouchableOpacity>
      </View>
      {bottomSpace && <Separator height={bottomSpace} />}
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 4,
    width: width,
  },
  inputStyle: {
    height: scale(40),
    paddingRight: 50,
    paddingLeft: 10,
  },
  iconContainer: {
    position: "absolute",
    height: scale(34),
    right: scale(3),
    top: scale(3),
    backgroundColor: colors.primaryTheme,
    borderRadius: 50,
    padding: 6,
  },
});

export default SearchInput;
