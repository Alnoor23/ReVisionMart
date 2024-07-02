import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import { Heading } from "../components/basic";
import SearchInput from "../components/SearchInput";
import MasonryList from "@react-native-seoul/masonry-list";
import ProductCard from "../components/ProductCard";
import colors from "../config/colors";
import { useAuthContext } from "../context/AuthContext";
import { getProducts, getCategories } from "../api/services";
import { Category, Product } from "../api/types";
import ProductCardHorizontal from "../components/ProductCardHorizontal";

const Home = () => {
  const { authToken } = useAuthContext();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const [productLayout, setProductLayout] = useState<1 | 2>(2);
  //get data
  useEffect(() => {
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
        <View
          style={{
            height: 250,
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../assets/images/End of Year Promo Banner_resized.png")}
          />
        </View>
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
          <View style={styles.productsHeader}>
            <View>
              <Heading topSpace={10} bottomSpace={10} color="primaryTheme">
                For You
              </Heading>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {productLayout === 2 ? (
                <TouchableOpacity onPress={() => setProductLayout(1)}>
                  <Image
                    style={{ height: 20, width: 24, resizeMode: "contain" }}
                    source={require("../../assets/icons/layout-double.png")}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setProductLayout(2)}>
                  <Image
                    style={{ height: 12, width: 24, resizeMode: "contain" }}
                    source={require("../../assets/icons/layout-single.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {products ? (
            <MasonryList
              scrollEnabled={false}
              data={products}
              numColumns={productLayout}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) =>
                productLayout == 2 ? (
                  <ProductCard product={item as Product} />
                ) : (
                  <ProductCardHorizontal product={item as Product} />
                )
              }
            />
          ) : (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator size={25} color={colors.primaryTheme} />
            </View>
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
  productsHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
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
