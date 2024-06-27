import React from "react";
import {
  View,
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Heading } from "../components/basic";
import { Product } from "../api/types";
import colors from "../config/colors";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { _id, title, description, category, images, price } = product;

  const handlePress = (event: GestureResponderEvent, product: Product) => {
    console.log(`pressed ${product.title} for ${product.price}$.`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={(event) => handlePress(event, product)}
    >
      <Image style={styles.thumbnail} source={{ uri: images[0] }} />
      <Heading size={14} color="primaryTheme" topSpace={10} bottomSpace={10}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#fff",
    minHeight: 150,
    width: "100%",
    resizeMode: "center",
  },
  price_ratingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ProductCard;
