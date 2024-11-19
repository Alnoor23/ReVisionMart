import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Heading, Separator, Text } from "../components/basic";
import { RouteProp } from "@react-navigation/native";
import { CartParamList } from "../navigation/types";
import LottieView from "lottie-react-native";
import { StackNavigationProp } from "@react-navigation/stack";

interface BuyProps {
  route: RouteProp<CartParamList, "BuyScreen">;
  navigation: StackNavigationProp<CartParamList, "BuyScreen">;
}

const Buy: React.FC<BuyProps> = ({ navigation, route }) => {
  const { orderId, products, total } = route.params.order;

  return (
    <View style={styles.container}>
      <View>
        <Heading
          size={18}
          bold
          color="primaryTheme"
          topSpace={10}
          align="center"
        >
          Order Confirmed
        </Heading>
        <Text align="center" topSpace={5}>
          Order Id: {orderId}
        </Text>
      </View>
      <View>
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../../assets/orderConfirmed.json")}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop={false}
          />
        </View>
        <Heading
          align="center"
          bold
          size={15}
          color="green"
          style={{ marginTop: -30 }}
        >
          Your has been Confirmed.
        </Heading>
        <Text align="center" size={12}>
          It's on its way.
        </Text>
      </View>
      <Separator height={10} />
      <View>
        <Button
          title="Track Order"
          bold
          textColor="primaryTheme"
          buttonColor="white"
          borderColor="primaryTheme"
          borderWidth={2}
          onPress={() => navigation.navigate("OrdersScreen")}
        />
        <Button
          title="Continue Shopping"
          bold
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default Buy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  animationContainer: {
    height: 300,
    width: "100%",
    marginTop: 50,
  },
});
