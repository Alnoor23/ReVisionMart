import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../components/basic";
import { Product } from "../api/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { _id, title, description, category, images, price } = product;
  return (
    <View style={styles.container}>
      <Text color="white" topSpace={10} bottomSpace={10}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: {} });

export default ProductCard;
