import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Heading } from "../components/basic";
import SearchInput from "../components/SearchInput";
import MasonryList from "@react-native-seoul/masonry-list";
import AppCarousel from "../components/AppCarousel";
import ProductCard from "../components/ProductCard";
import colors from "../config/colors";
import { useAuthContext } from "../context/AuthContext";
import { getCarouselItems, getProducts } from "../api/services";
import { Product } from "../api/types";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { authToken } = useAuthContext();
  const [promotionItems, setPromotionItems] = useState<Product[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);

  //get data
  useEffect(() => {
    setLoading(true);
    const getCarouselPromoItems = async () => {
      try {
        if (!!authToken) {
          const { data, status } = await getCarouselItems(authToken);
          if (status === 200 && data !== undefined) {
            setPromotionItems(data);
          }
        }
      } catch (error) {
        console.log("error :", error);
      } finally {
        setLoading(false);
      }
    };

    const getAllProducts = async () => {
      try {
        if (!!authToken) {
          const { data, status } = await getProducts(authToken);
          if (status === 200 && data !== undefined) {
            setProducts(data);
          }
        }
      } catch (error) {
        console.log("error : ", error);
      }
    };

    getCarouselPromoItems();
    getAllProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading color="white" align="center" topSpace={5} bottomSpace={5} bold>
          ReVision
        </Heading>
        <SearchInput placeholder="SmartPhone" />
      </View>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <AppCarousel loading={loading} data={promotionItems} />

        <View style={{ height: 80, backgroundColor: "red", marginTop: 10 }}>
          <Text align="center">Categories</Text>
        </View>

        <View style={styles.productsContainer}>
          <Heading topSpace={10} bottomSpace={10} color="white">
            For You
          </Heading>

          {products && (
            <MasonryList
              scrollEnabled={false}
              data={products}
              numColumns={1}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <ProductCard product={item as Product} />
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: colors.primaryTheme,
    paddingBottom: 10,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  productsContainer: {
    flex: 1,
    backgroundColor: colors.primaryTheme,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingBottom: 10,
  },
});

export default Home;
