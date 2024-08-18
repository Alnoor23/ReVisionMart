import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SearchInput from "./SearchInput";
import colors from "../config/colors";
import debounce from "lodash.debounce";
import { search } from "../api/services";
import { Product } from "../api/types";

interface SearchProps {
  placeholder?: string;
  containerColor?: keyof typeof colors;
  onFocus?: (e: any) => void;
  active?: boolean;
  showKeyboard?: boolean;
  results?: Product[];
  setResults?: (data: Product[]) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder,
  containerColor,
  onFocus,
  active = false,
  showKeyboard = true,
  results,
  setResults,
}) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getsearchQueryData = useCallback(
    debounce(async (query: string | null) => {
      setLoading(true); // TODO: CHECK and add timeout if needed for feedback performance
      if (!query) return setLoading(false);
      const { data, status } = await search(query);
      if (status === 200 && data) {
        if (setResults) {
          setResults(data);
        }
        setLoading(false);
      }
    }, 1000), // timeout
    []
  );

  useEffect(() => {
    getsearchQueryData(searchQuery);
  }, [searchQuery, getsearchQueryData]);

  return (
    <View>
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={placeholder}
        containerColor={containerColor}
        onPressEnter={() => getsearchQueryData(searchQuery)}
        onPressIcon={() => getsearchQueryData(searchQuery)}
        onFocus={onFocus}
        active={active}
        showKeyboard={showKeyboard}
        loading={loading}
      />
    </View>
  );
};

export default Search;
