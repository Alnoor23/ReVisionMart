import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CartParamList } from "./types";
import Buy from "../screens/Buy";
import Cart from "../screens/Cart";

const Stack = createStackNavigator<CartParamList>();

function CartNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartScreen" component={Cart} />
      <Stack.Screen name="BuyScreen" component={Buy} />
      {/* <Stack.Screen name="HomeNavigator" component={} /> */}
    </Stack.Navigator>
  );
}

export default CartNavigator;
