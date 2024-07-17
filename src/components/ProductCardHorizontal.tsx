import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Heading } from "./basic";
import { Product } from "../api/types";

interface ProductCardHorizontalProps {
  product: Product;
  onPress: (product: Product) => void;
  extraRowComponent?: React.ReactNode;
}

const ProductCardHorizontal: React.FC<ProductCardHorizontalProps> = ({
  product,
  onPress,
  extraRowComponent,
}) => {
  const { _id, title, description, category, images, price } = product;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(product)}>
      <Image style={styles.thumbnail} source={{ uri: images[0] }} />
      <View style={{ width: "2%" }} />
      <View style={{ width: "58%" }}>
        <Heading
          style={{ flex: 1, flexWrap: "wrap" }}
          size={14}
          color="primaryTheme"
          topSpace={10}
          bottomSpace={10}
        >
          {title}
        </Heading>
        <View style={styles.price_ratingContainer}>
          <View>
            <Heading size={13} color="secondaryTheme" bold>
              ${price}
            </Heading>
          </View>
          <Heading color="lightGrayText" size={12}>
            4.5/5
          </Heading>
        </View>
        {extraRowComponent}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    padding: 10,
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
  thumbnail: {
    minHeight: 80,
    width: "40%",
    resizeMode: "center",
  },
  price_ratingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ProductCardHorizontal;
