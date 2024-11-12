import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { CartParamList } from "./types";
import Buy from "../screens/Buy";
import Cart from "../screens/Cart";

const Stack = createStackNavigator<CartParamList>();

function CartNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartScreen" component={Cart} />
      <Stack.Screen name="BuyScreen" component={Buy} />

      {/* <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, // TODO: replace with a custom animation
        }}
      /> */}
    </Stack.Navigator>
  );
}

export default CartNavigator;
