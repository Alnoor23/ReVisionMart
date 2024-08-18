import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import colors from "../config/colors";
import { Heading } from "../components/basic";
import SearchBar from "../components/Search";
import { Product } from "../api/types";
import ProductCardHorizontal from "../components/ProductCardHorizontal";

const Search = () => {
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);

  return (
    <>
      <View style={styles.header}>
        <Heading color="white" align="center" topSpace={5} bottomSpace={5} bold>
          ReVision
        </Heading>
        <SearchBar setResults={setSearchResults} active showKeyboard />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {searchResults && searchResults?.length > 0 ? (
          searchResults.map((e) => (
            <ProductCardHorizontal
              onPress={() => console.log(e.title)}
              product={e}
              key={e._id}
            />
          ))
        ) : (
          <View style={{ padding: 40 }}>
            <Heading align="center" color="lightGrayText">
              Oh Noo, We couldn't find what are you looking for.
            </Heading>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.primaryTheme },
  header: {
    backgroundColor: colors.primaryTheme,
    paddingBottom: 5,
  },
});

export default Search;
