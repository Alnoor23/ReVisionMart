import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppCarousel from "../components/AppCarousel";
import ImageViewer from "react-native-image-zoom-viewer";
import { Button, Heading, Text } from "../components/basic";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { useAuthContext } from "../context/AuthContext";
import { getProductbyId } from "../api/services";
import { ProductwithCategory } from "../api/types";
import { HomeParamList } from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import SearchInput from "../components/SearchInput";

export interface ProductScreenProps {
  navigation: StackNavigationProp<HomeParamList, "ProductScreen">;
  route: RouteProp<HomeParamList, "ProductScreen">;
}

const Product: React.FC<ProductScreenProps> = ({ route }) => {
  const { authToken } = useAuthContext();
  const { itemId } = route.params;

  const [product, setProduct] = useState<ProductwithCategory | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    const getProduct = async () => {
      if (authToken) {
        try {
          const { data, status } = await getProductbyId(itemId, authToken);
          if (status === 200 && data !== undefined) {
            setProduct(data);
          } else {
            console.log("No product found for the given ID");
          }
        } catch (error) {
          console.log("error getting the product from the given ID", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getProduct();
  }, []);

  const addToCart = () => {
    // TODO: Add product to cart
    console.log("Add to cart button clicked");
  };

  const buyNow = () => {
    // TODO: Add navigation to checkout screen with product details
    console.log("Buy now button clicked");
  };

  return (
    <>
      <View style={styles.header}>
        <SearchInput
          placeholder={
            "More products like " + product?.title.substring(0, 12) + "..."
          }
          containerColor="primaryTheme"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <AppCarousel
            data={product?.images}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
            onPress={() => setModalVisible(!modalVisible)}
            loading={loading}
          />
          <View style={styles.contentContainer}>
            <View style={styles.heading}>
              <Heading size={20} topSpace={20} bold>
                {product?.title}
              </Heading>
              <View style={{ flex: 1 }} />
              <TouchableOpacity style={{ marginTop: 5 }}>
                <MaterialCommunityIcons
                  name="heart-outline" // TODO: Change on user like
                  size={25}
                  color={colors.danger}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.heading}>
              <Heading color="secondaryTheme" size={20} bold>
                {product?.price}$
              </Heading>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text size={12} color="mediumGrayText">
                  4.5/5
                </Text>
                <Text size={12} color="mediumGrayText">
                  {" "}
                  |{" "}
                </Text>
                <Text size={12} color="mediumGrayText">
                  145 sold
                </Text>
              </View>
            </View>
            <View style={styles.content}>
              <Heading bottomSpace={5}>Description</Heading>
              <Text>{product?.description}</Text>
            </View>
          </View>
        </View>
        <Modal visible={modalVisible} transparent>
          <ImageViewer
            swipeDownThreshold={100}
            enableSwipeDown
            index={imageIndex}
            onSwipeDown={() => setModalVisible(!modalVisible)}
            imageUrls={product?.images?.map((url: string) => ({
              url,
              width: 0,
              height: 0,
            }))}
          />
        </Modal>
        <View style={styles.suggestedProducts}>{/* TODO: fill this */}</View>
      </ScrollView>
      <View style={styles.actionButton}>
        <Button
          title="Add to Cart"
          width={"48%"}
          borderRadius={50}
          buttonColor="white"
          textColor="secondaryTheme"
          borderWidth={3}
          borderColor="secondaryTheme"
          onPress={addToCart}
          fontSize={18}
          bold
        />
        <Button
          title="Buy Now"
          width={"48%"}
          borderRadius={50}
          onPress={buyNow}
          fontSize={18}
          bold
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    backgroundColor: colors.primaryTheme,
    paddingBottom: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: { marginTop: 20 },
  suggestedProducts: {},
  actionButton: {
    position: "absolute",
    flex: 1,
    bottom: 0,
    width: "100%",
    height: 64,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 5,
  },
});

export default Product;
