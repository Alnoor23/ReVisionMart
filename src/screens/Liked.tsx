import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Heading } from "../components/basic";
import { useAuthContext } from "../context/AuthContext";
import { getWishlist, updateWishlist } from "../api/services";
import ProductCardHorizontal from "../components/ProductCardHorizontal";
import { Product, Wishlist } from "../api/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import debounce from "lodash.debounce";

const Liked = () => {
  const [userWishlist, setUserWishlist] = useState<Wishlist | null>(null);
  const { authToken } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const updateUserWishlist = useCallback(
    debounce(async (wishlist: Wishlist) => {
      if (!authToken || !wishlist) return;
      console.log("REQ SENT");
      const formattedWishlist = {
        userId: wishlist.userId,
        products: wishlist.products.map((product) => ({
          product: product.product._id,
          quantity: product.quantity,
        })),
      };

      try {
        const { data, status } = await updateWishlist(
          authToken,
          formattedWishlist
        );
        if (!data && status !== 200) {
          console.log(`Error updating wishlist ${status}:`, data);
        }
      } catch (error) {
        console.log("Error updating wishlist: ", error);
      }
    }, 500),
    [authToken]
  );

  const handleQuantityIncrement = (productId: string) => {
    if (!userWishlist) return;

    const updatedUserProducts = userWishlist.products.map((item) => {
      if (item.product._id === productId) {
        return {
          ...item,
          quantity: item.quantity >= 100 ? item.quantity : item.quantity + 1,
        };
      }
      return item;
    });

    const updatedWishlist = { ...userWishlist, products: updatedUserProducts };
    setUserWishlist(updatedWishlist);

    updateUserWishlist(updatedWishlist);
  };

  const handleQuantityDecrement = (productId: string) => {
    if (!userWishlist) return;

    const updatedUserProducts = userWishlist.products.map((product) => {
      if (product.product._id === productId) {
        return { ...product, quantity: Math.max(product.quantity - 1, 0) };
      }
      return product;
    });

    const updatedWishlist = { ...userWishlist, products: updatedUserProducts };
    setUserWishlist(updatedWishlist);

    updateUserWishlist(updatedWishlist);
  };

  const handleAddToCart = (productId: string) => {
    console.log("add to cart", productId);
  };

  const getLikedProducts = async () => {
    setLoading(true);
    if (!authToken) return console.log("No auth token provided.");

    try {
      const { data, status } = await getWishlist(authToken);
      if (status === 200 && data !== undefined) {
        setUserWishlist(data);
      }
    } catch (error) {
      console.log("Error getting the data :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLikedProducts();
  }, [authToken]);

  return (
    <View style={styles.container}>
      <Heading size={18} color="primaryTheme" topSpace={10} align="center">
        Wishlist
      </Heading>
      {userWishlist && (
        <FlatList
          onRefresh={() => getLikedProducts()}
          refreshing={loading}
          data={userWishlist.products}
          keyExtractor={(item: any) => item.product._id}
          renderItem={({ item }) => (
            <ProductCardHorizontal
              product={item.product as Product}
              onPress={() => console.log("product pressed...")}
              extraRowComponent={
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 5,
                      borderColor: colors.lightGray,
                      borderRadius: 10,
                      borderWidth: 2,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleQuantityDecrement(item.product._id)}
                    >
                      <MaterialCommunityIcons
                        name="minus"
                        size={20}
                        color={colors.mediumGray}
                      />
                    </TouchableOpacity>
                    <Heading
                      style={{ marginHorizontal: 10 }}
                      size={14}
                      color="mediumGrayText"
                    >
                      {item.quantity}
                    </Heading>
                    <TouchableOpacity
                      onPress={() => handleQuantityIncrement(item.product._id)}
                    >
                      <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color={colors.mediumGray}
                      />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleAddToCart(item.product._id)}
                  >
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
                </View>
              }
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Liked;
