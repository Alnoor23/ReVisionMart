import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Heading } from "../components/basic";
import { useAuthContext } from "../context/AuthContext";
import { getPopulatedWishlist, removeProductToWishlist } from "../api/services";
import ProductCardHorizontal from "../components/ProductCardHorizontal";
import { Product, WishlistWithProduct } from "../api/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { WishlistParamList } from "../navigation/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface WishlistProps {
  navigation: BottomTabNavigationProp<WishlistParamList, "WishListScreen">;
}

const WishList: React.FC<WishlistProps> = ({ navigation }) => {
  const { userWishlist, setUserWishlist, authToken } = useAuthContext();
  const [wishlist, setWishlist] = useState<WishlistWithProduct | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!authToken) return console.log("No auth token provided.");

    const { data, status } = await removeProductToWishlist(productId);
    if (status === 200 && data) {
      console.log(data);
      setUserWishlist(data);
      getWishlistProducts();
    } else {
      console.log(`Error removing product from wishlist ${status}:`, data);
    }
  };

  const handleAddToCart = (productId: string) => {};

  const getWishlistProducts = async () => {
    setLoading(true);
    if (!authToken) return console.log("No auth token provided.");
    console.log("Getting products");

    try {
      const { data, status } = await getPopulatedWishlist();
      if (status === 200 && data !== undefined) {
        setWishlist(data);
      }
    } catch (error) {
      console.log("Error getting the data :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlistProducts();
  }, [authToken]);

  return (
    <View style={styles.container}>
      <Heading size={18} color="primaryTheme" topSpace={10} align="center">
        Wishlist
      </Heading>
      {wishlist ? (
        <FlatList
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Heading align="center" color="lightGrayText" topSpace={50}>
                Oh Noo, Such empty
              </Heading>
            </View>
          }
          onRefresh={() => getWishlistProducts()}
          refreshing={loading}
          data={wishlist.products}
          keyExtractor={(item: Product) => item._id}
          renderItem={({ item }) => (
            <ProductCardHorizontal
              product={item as Product}
              onPress={() => {
                navigation.navigate("ProductScreen", {
                  itemId: item._id,
                });
              }}
              extraRowComponent={
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity onPress={() => handleAddToCart(item._id)}>
                    <View
                      style={{
                        opacity: 0.75,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="cart-plus"
                        size={24}
                        color={colors.green}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleRemoveFromWishlist(item._id)}
                  >
                    <View
                      style={{
                        opacity: 0.75,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={24}
                        color={colors.danger}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              }
            />
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WishList;
