import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Input, Separator } from "./basic";
import { scale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { TextInput } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

interface SearchInputProps {
  placeholder?: string;
  containerColor?: keyof typeof colors;
  topSpace?: number;
  bottomSpace?: number;
  searchQuery: string | null;
  setSearchQuery: (query: string) => void;
  onPressIcon?: () => void;
  onPressEnter?: () => void;
  onFocus?: (e: any) => void;
  active?: boolean;
  showKeyboard?: boolean;
  loading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  // containerColor = "white",
  topSpace,
  bottomSpace,
  searchQuery,
  setSearchQuery,
  onPressEnter,
  onPressIcon,
  onFocus,
  active = false,
  showKeyboard = true,
  loading = false,
}) => {
  const ref = useRef<TextInput>(null);

  return (
    <>
      {topSpace && <Separator height={topSpace} />}
      <View
        style={[
          styles.searchContainer,
          // { backgroundColor: colors[containerColor] },
        ]}
      >
        <Input
          borderRadius={26}
          Inputstyle={styles.inputStyle}
          placeholder={placeholder}
          onChangeText={setSearchQuery}
          onSubmit={onPressEnter}
          onFocus={onFocus}
          inputRef={ref}
          showSoftInputOnFocus={showKeyboard}
          autoFocus={active}
        />
        <TouchableOpacity onPress={onPressIcon}>
          <View style={styles.iconContainer}>
            {loading ? (
              <ActivityIndicator size={scale(24)} color={colors.white} />
            ) : (
              <MaterialCommunityIcons
                name="magnify"
                color={colors.white}
                size={scale(24)}
              />
            )}
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
  results: {
    flex: 1,
    minHeight: 200,
    zIndex: 100,
  },
});

export default SearchInput;
