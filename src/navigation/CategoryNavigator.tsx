import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../screens/Categories";

const Stack = createStackNavigator();

function CategoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CategoriesScreen" component={Categories} />
    </Stack.Navigator>
  );
}

export default CategoryNavigator;
