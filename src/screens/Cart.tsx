import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Heading } from "../components/basic";
import { CartWithProduct, Product } from "../api/types";
import { getPopulatedCart, removeProductFromCart } from "../api/services";
import { useAuthContext } from "../context/AuthContext";
import ProductCardHorizontal from "../components/ProductCardHorizontal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CartParamList } from "../navigation/types";
import { scale } from "react-native-size-matters";

interface CartProps {
  navigation: BottomTabNavigationProp<CartParamList, "CartScreen">;
}

const Cart: React.FC<CartProps> = ({ navigation }) => {
  const { authToken } = useAuthContext();
  const [cart, setCart] = useState<CartWithProduct | null>(null);
  const [loading, setLoading] = useState(false);

  const getUserCart = async () => {
    setLoading(true);
    if (!authToken) return console.log("No auth token provided.");

    try {
      const { data, status } = await getPopulatedCart();
      if (status === 200 && data) {
        setCart(data);
      }
    } catch (error) {
      console.log("Error getting the data :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovefromCart = async (productId: string) => {
    try {
      const { data, status } = await removeProductFromCart(productId);

      if (status === 200 && data) {
        getUserCart();
      }
    } catch (error) {
      console.log("Error removing product from cart :", error);
    }
  };

  useEffect(() => {
    getUserCart();
  }, [authToken]);

  return (
    <View style={styles.container}>
      <Heading size={18} bold color="primaryTheme" topSpace={10} align="center">
        Cart Screen
      </Heading>
      {cart ? (
        <FlatList
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Heading align="center" color="lightGrayText" topSpace={50}>
                Oh Noo, Such empty
              </Heading>
            </View>
          }
          onRefresh={() => getUserCart()}
          refreshing={loading}
          data={cart.products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProductCardHorizontal
              product={item.product as Product}
              onPress={() => {
                navigation.navigate("ProductScreen", {
                  itemId: item.product._id,
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
                  <TouchableOpacity
                  // TODO:onPress={}
                  >
                    <View
                      style={{
                        opacity: 0.75,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="cart-arrow-down"
                        size={24}
                        color={colors.green}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleRemovefromCart(item.product._id)}
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
      <View style={styles.bottomButtonBar}>
        <Button title="Buy Now" bold width={"84%"} />
        <TouchableOpacity style={styles.deleteButton}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color={colors.danger}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  bottomButtonBar: {
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 10,
  },
  deleteButton: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.danger,
    padding: 12,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
  },
});

export default Cart;
