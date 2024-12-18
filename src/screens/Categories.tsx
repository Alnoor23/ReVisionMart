import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Heading } from "../components/basic";
import CategoryCard from "../components/CategoryCard";
import { Category } from "../api/types";
import { getCategories } from "../api/services";
import { useAuthContext } from "../context/AuthContext";
import { CategoryParamList } from "../navigation/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface CategoriesProps {
  navigation: BottomTabNavigationProp<CategoryParamList, "CategoriesScreen">;
}

const Categories: React.FC<CategoriesProps> = ({ navigation }) => {
  const { authToken } = useAuthContext();
  const [categories, setCategories] = useState<Category[] | null>(null);

  // get data
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        if (!!authToken) {
          const { data, status } = await getCategories();
          if (status === 200 && data !== undefined) {
            setCategories(data);
          }
        }
      } catch (error) {
        console.log("error getting categories : ", error);
      }
    };

    getAllCategories();
  }, []);

  const handlePress = (category: Category) => {
    navigation.navigate("CategoryScreen", { category });
  };

  return (
    <View style={styles.container}>
      {categories && (
        <FlatList<Category>
          contentContainerStyle={{ alignItems: "center" }}
          data={categories}
          ListHeaderComponent={
            <Heading topSpace={20} bold size={20} color="primaryTheme">
              Categories
            </Heading>
          }
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CategoryCard
              onPress={() => handlePress(item)}
              category={item}
              reverse={index % 2 == 0}
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
    paddingHorizontal: 20,
  },
});

export default Categories;
