import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Heading, Text } from "../components/basic";
import { CartWithProduct, Product } from "../api/types";
import {
  getPopulatedCart,
  removeProductFromCart,
  updateCartProduct,
} from "../api/services";
import { useAuthContext } from "../context/AuthContext";
import ProductCardHorizontal from "../components/ProductCardHorizontal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CartParamList } from "../navigation/types";
import Modal from "react-native-modal";
import { Form, FormField, SubmitButton } from "../components/form";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import * as Yup from "yup";

interface CartProps {
  navigation: BottomTabNavigationProp<CartParamList, "CartScreen">;
}

const validationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  number: Yup.number().required("Phone Number is required"),
});

const Cart: React.FC<CartProps> = ({ navigation }) => {
  const { authToken } = useAuthContext();
  const [cart, setCart] = useState<CartWithProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardValid, setCardValid] = useState(false);

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

  function calculateTotalAmount(cart: CartWithProduct): number {
    let totalAmount = 0;

    if (cart && cart.products) {
      cart.products.forEach((product) => {
        totalAmount += product.product.price * product.quantity;
      });
    }

    return totalAmount;
  }

  useEffect(() => {
    getUserCart();
  }, [authToken]);

  useEffect(() => {
    if (cart) {
      const amount = calculateTotalAmount(cart);
      setTotalPrice(amount);
    }
  }, [cart]);

  return (
    <>
      <View style={styles.container}>
        <Heading
          size={18}
          bold
          color="primaryTheme"
          topSpace={10}
          align="center"
        >
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
                    <View style={styles.quantity}>
                      <TouchableOpacity
                        onPress={async () => {
                          try {
                            // TODO: apply debouncing
                            if (item.quantity - 1 == 0) {
                              console.log("it's zero quantity");
                              return handleRemovefromCart(item.product._id);
                            }

                            const { data, status } = await updateCartProduct(
                              item._id,
                              item.quantity - 1
                            );

                            if (status == 200) {
                              console.log(item._id, item.quantity - 1);
                              getUserCart();
                            }
                          } catch (error) {
                            console.log("Error updating cart product :", error);
                          }
                        }}
                        style={{ justifyContent: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="minus-thick"
                          color={colors.mediumGrayText}
                          size={14}
                        />
                      </TouchableOpacity>

                      <Heading color="primaryTheme" bold>
                        {" "}
                        {item.quantity}{" "}
                      </Heading>

                      <TouchableOpacity
                        onPress={async () => {
                          try {
                            // TODO: apply debouncing
                            if (item.quantity + 1 > 99) {
                              console.log("it's above 99");
                            }

                            const { data, status } = await updateCartProduct(
                              item._id,
                              item.quantity + 1
                            );

                            if (status == 200) {
                              console.log(item._id, item.quantity + 1);
                              getUserCart();
                            }
                          } catch (error) {
                            console.log("Error updating cart product :", error);
                          }
                        }}
                        style={{ justifyContent: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="plus-thick"
                          color={colors.mediumGrayText}
                          size={14}
                        />
                      </TouchableOpacity>
                    </View>

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

        <View style={{ paddingLeft: 10 }}>
          <Heading>Total : {totalPrice.toFixed(2)}$</Heading>
        </View>

        <View style={styles.bottomButtonBar}>
          <Button
            title="Buy Now"
            bold
            width={"84%"}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <TouchableOpacity style={styles.deleteButton}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color={colors.danger}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal isVisible={modalVisible}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.modalContainer}>
            <Heading
              size={18}
              align="center"
              bottomSpace={16}
              color="primaryTheme"
              bold
            >
              Confirm Details
            </Heading>
            <Form
              validationSchema={validationSchema}
              initialValues={{ address: "", number: "" }}
              onSubmit={(values) => {
                if (cardValid) {
                  console.log("Submitting order", values);
                  setModalVisible(!modalVisible);
                  return navigation.navigate("BuyScreen");
                } else {
                  console.log("Error submitting order", values, cardValid);
                }
              }}
            >
              {/* got bored so no filtering inputfields */}
              <FormField name="address" placeholder="Enter your Address" />
              <FormField name="number" placeholder="Enter your Phone Number" />
              <LiteCreditCardInput
                onChange={(field) => setCardValid(field.valid)}
              />

              <SubmitButton title="Place Order" bold />
              <Text align="center" size={10} color="mediumGrayText">
                We will send you a confirmation email and SMS.
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Heading
                  color="mediumGrayText"
                  topSpace={6}
                  align="center"
                  size={14}
                  style={{ textDecorationLine: "underline" }}
                >
                  Go back
                </Heading>
              </TouchableOpacity>
            </Form>
          </View>
        </View>
      </Modal>
    </>
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
  quantity: {
    flexDirection: "row",
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
});

export default Cart;
