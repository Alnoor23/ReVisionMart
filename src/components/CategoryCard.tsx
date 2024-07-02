import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Heading } from "./basic";
import { Category } from "../api/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CategoryCardProps {
  category: Category;
  reverse?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, reverse }) => {
  return (
    <TouchableOpacity style={[styles.container, reverse && styles.reverse]}>
      <Heading color="mediumGrayText" size={20} bold>
        {category.name}
      </Heading>
      <MaterialCommunityIcons
        style={{ marginTop: 20 }}
        name={category.iconName}
        size={160}
        color={category.iconColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 140,
    width: "90%",
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0,0.3)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  reverse: {
    flexDirection: "row-reverse",
  },
});

export default CategoryCard;
