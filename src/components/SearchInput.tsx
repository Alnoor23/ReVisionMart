import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { Input } from "./basic";
import { scale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const { width } = Dimensions.get("window");

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  return (
    <View style={styles.searchContainer}>
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
    width: "100%",
    paddingRight: 20,
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
