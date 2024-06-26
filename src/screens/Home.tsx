import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import { Text, Heading } from "../components/basic";
import SearchInput from "../components/SearchInput";
import MasonryList from "@react-native-seoul/masonry-list";
import AppCarousel from "../components/AppCarousel";
import ProductCard from "../components/ProductCard";
import colors from "../config/colors";
import { useAuthContext } from "../context/AuthContext";
import { getCarouselItems, getProducts, getCategories } from "../api/services";
import { Category, Product } from "../api/types";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { authToken } = useAuthContext();
  const [promotionItems, setPromotionItems] = useState<Product[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

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
        console.log("error getting products : ", error);
      }
    };

    const getAllCategories = async () => {
      try {
        if (!!authToken) {
          const { data, status } = await getCategories(authToken);

          if (status === 200 && data !== undefined) {
            setCategories(data);
          }
        }
      } catch (error) {
        console.log("error getting categories : ", error);
      }
    };

    getCarouselPromoItems();
    getAllCategories();
    getAllProducts();
  }, []);

  //onClicks
  const onPressCategory = (
    event: GestureResponderEvent,
    category: Category
  ) => {
    console.log(category.name);
  };

  return (
    <>
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

        {categories ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((category: Category) => (
              <TouchableOpacity
                key={category._id}
                style={styles.pill}
                onPress={(event) => onPressCategory(event, category)}
              >
                <Heading color="primaryTheme" size={14}>
                  {category.name}
                </Heading>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={{ marginTop: 10 }}>
            <ActivityIndicator size={25} color={colors.primaryTheme} />
          </View>
        )}

        <View style={styles.productsContainer}>
          <Heading topSpace={10} bottomSpace={10} color="primaryTheme">
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
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryTheme,
    paddingBottom: 5,
  },
  productsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingBottom: 10,
  },
  categoryContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
  },
  pill: {
    borderColor: colors.primaryTheme,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 50,
    marginHorizontal: 10,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginTop: 10,
  },
});

export default Home;
