import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { CategoryParamList } from "../navigation/types";
import MasonryList from "@react-native-seoul/masonry-list";
import { getProductsByCategory } from "../api/services";
import { useAuthContext } from "../context/AuthContext";
import { Product } from "../api/types";
import { Heading } from "../components/basic";
import ProductCard from "../components/ProductCard";
import ProductCardHorizontal from "../components/ProductCardHorizontal";
import colors from "../config/colors";
import { StackNavigationProp } from "@react-navigation/stack";

interface CategoryProps {
  navigation: StackNavigationProp<CategoryParamList, "CategoryScreen">;
  route: RouteProp<CategoryParamList, "CategoryScreen">;
}

const Category: React.FC<CategoryProps> = ({ route, navigation }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const { _id: categoryId, name: categoryName } = route.params.category;
  const { authToken } = useAuthContext();

  const [productLayout, setProductLayout] = useState<1 | 2>(2);

  useEffect(() => {
    const getProducts = async () => {
      if (!authToken) return console.log("No auth token");

      try {
        const { status, data } = await getProductsByCategory(categoryId);

        if (status === 200 && data) {
          setProducts(data);
        }
      } catch (error) {
        console.log("Error getting the products", error);
      }
    };

    getProducts();
  }, [authToken, categoryId]);

  const handleProductCardPress = (product: Product) => {
    navigation.navigate("ProductScreen", { itemId: product._id });
  };

  return (
    <ScrollView>
      <Heading
        bold
        size={18}
        align="center"
        topSpace={10}
        bottomSpace={10}
        color="primaryTheme"
      >
        {categoryName}
      </Heading>

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: 20,
          }}
        >
          <Heading size={12} color="primaryTheme">
            Layout:{" "}
          </Heading>
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
              <ProductCard
                product={item as Product}
                onPress={() => handleProductCardPress(item as Product)}
              />
            ) : (
              <ProductCardHorizontal
                product={item as Product}
                onPress={() => handleProductCardPress(item as Product)}
              />
            )
          }
        />
      ) : (
        <View style={{ marginTop: 10 }}>
          <ActivityIndicator size={25} color={colors.primaryTheme} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default Category;
