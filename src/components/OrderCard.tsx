import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Order } from "../api/types";
import { Heading, Text } from "./basic";
import colors from "../config/colors";
import { OrderParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

interface OrderCardProps {
  order: Order;
  // onEditPress: () => void;
  // onDeletePress: () => void;
  navigation: StackNavigationProp<OrderParamList, "OrdersScreen">;
}
const OrderCard: React.FC<OrderCardProps> = ({ order, navigation }) => {
  const { orderId, total, products, address } = order;

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Heading size={12} color="white">
          Order No. {orderId}
        </Heading>
      </View>
      <ScrollView horizontal style={styles.content}>
        {products.map((product) => (
          <TouchableOpacity
            key={product._id}
            onPress={() =>
              navigation.navigate("ProductScreen", {
                itemId: product.product._id,
              })
            }
          >
            <Image
              source={{ uri: product.product.images[0] }}
              style={styles.productImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Heading>Total: {total.toFixed(2)}</Heading>
        <Text>{address.substring(0, 15)}...</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    backgroundColor: "#fff",
    // borderColor: colors.primaryTheme,
    // borderWidth: 2,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.84,
    elevation: 15,
    marginBottom: 20,
    // flex: 1,
  },
  header: {
    width: "100%",
    paddingVertical: 5,
    backgroundColor: colors.primaryTheme,
    paddingHorizontal: 20,
  },
  content: {
    // flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "row",
    marginVertical: 10,
    overflow: "scroll",
  },
  productImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  footer: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OrderCard;
