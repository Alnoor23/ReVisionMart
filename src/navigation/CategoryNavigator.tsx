import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../screens/Categories";
import Category from "../screens/Category";
import { CategoryParamList } from "./types";

const Stack = createStackNavigator<CategoryParamList>();

function CategoryNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoriesScreen" component={Categories} />
      <Stack.Screen name="CategoryScreen" component={Category} />
    </Stack.Navigator>
  );
}

export default CategoryNavigator;
