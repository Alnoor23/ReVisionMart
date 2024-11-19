import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Heading } from "../components/basic";
import { getOrders } from "../api/services";
import { Orders as OrdersType } from "../api/types";
import OrderCard from "../components/OrderCard";

import { StackNavigationProp } from "@react-navigation/stack";
import { OrderParamList } from "../navigation/types";

interface OrdersProps {
  navigation: StackNavigationProp<OrderParamList, "OrdersScreen">;
}

const Orders: React.FC<OrdersProps> = ({ navigation }) => {
  const [orders, setOrders] = useState<OrdersType>();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const { data, status } = await getOrders();

    if (status === 200 && data !== undefined) {
      // console.log(data);
      setOrders(data);
    } else {
      console.log("Error getting the data :", status, data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Heading size={18} bold color="primaryTheme" topSpace={10} align="center">
        Your Orders
      </Heading>
      <FlatList
        refreshing={loading}
        contentContainerStyle={styles.orderList}
        onRefresh={() => getData()}
        data={orders}
        renderItem={({ item }) => (
          <OrderCard key={item._id} order={item} navigation={navigation} />
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Heading align="center" color="lightGrayText" topSpace={50}>
              Oh Noo, Such empty
            </Heading>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
  },
  orderList: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
});

export default Orders;
