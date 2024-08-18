import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  RefObject,
} from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AppCarousel from "../components/AppCarousel";
import ImageViewer from "react-native-image-zoom-viewer";
import { Button, Heading, Text } from "../components/basic";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { useAuthContext } from "../context/AuthContext";
import {
  addProductToWishlist,
  getProductbyId,
  getProductsByCategory,
  removeProductToWishlist,
} from "../api/services";
import { Product as ProductType, ProductwithCategory } from "../api/types";
import { HomeParamList } from "../navigation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import debounce from "lodash.debounce";

export interface ProductScreenProps {
  navigation: StackNavigationProp<HomeParamList, "ProductScreen">;
  route: RouteProp<HomeParamList, "ProductScreen">;
}

const Product: React.FC<ProductScreenProps> = ({ navigation, route }) => {
  const { userWishlist, setUserWishlist, authToken } = useAuthContext();
  const { itemId } = route.params;

  const [product, setProduct] = useState<ProductwithCategory | null>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const [productLiked, setProductLiked] = useState<Boolean>(false);

  const pageRef: RefObject<ScrollView> = useRef(null);

  const getProduct = useCallback(
    async (productId: string) => {
      if (authToken) {
        setLoading(true);
        try {
          const { data, status } = await getProductbyId(productId);
          if (status === 200 && data) {
            setProduct(data);
          } else {
            console.log("No product found for the given ID", data);
          }
        } catch (error) {
          console.log("Error getting the product from the given ID", error);
        } finally {
          setLoading(false);
        }
      }
    },
    [authToken]
  );

  useEffect(() => {
    getProduct(itemId);

    const liked = userWishlist?.products.some(
      (itemId) => itemId === product?._id
    );
    setProductLiked(!!liked);
  }, [getProduct, itemId]);

  useEffect(() => {
    const getProductsFromCategory = async () => {
      if (authToken && product?.category) {
        try {
          const { data, status } = await getProductsByCategory(
            product.category._id
          );
          if (status === 200 && data) {
            setSimilarProducts(data.filter((item) => item._id !== product._id));
          } else {
            console.log(
              "No similar products found in the same category.",
              data
            );
          }
        } catch (error) {
          console.log("Error getting similar category products.", error);
        }
      }
    };

    if (product) {
      getProductsFromCategory();
    }
  }, [authToken, product]);

  useEffect(() => {
    const liked = userWishlist?.products.some(
      (itemId) => itemId == product?._id
    );
    setProductLiked(!!liked);
  }, [product]);

  const addToCart = () => {
    // TODO: Add product to cart
    console.log("Add to cart button clicked");
  };

  const buyNow = () => {
    // TODO: Add navigation to checkout screen with product details
    console.log("Buy now button clicked");
  };

  const handleSimilarProductPress = (product: ProductType) => {
    getProduct(product._id);
    pageRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleToggleProductLike = useCallback(
    debounce(async () => {
      if (!product) return console.log("Product not found");

      if (productLiked) {
        const { data, status } = await removeProductToWishlist(product._id);
        if (status === 200 && data) {
          setUserWishlist(data);
          return setProductLiked(false);
        }
      } else {
        const { data, status } = await addProductToWishlist(product._id);
        if (status === 200 && data) {
          setUserWishlist(data);
          return setProductLiked(true);
        }
      }
    }, 150),
    [product, productLiked]
  );

  return (
    <>
      <View style={styles.header}>
        <Search
          placeholder={`more like ${product?.title.substring(0, 20)}...`}
          onFocus={() => navigation.navigate("SearchScreen")}
          showKeyboard={false}
        />
      </View>
      {product ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false} ref={pageRef}>
            <View style={styles.container}>
              <AppCarousel
                data={product.images}
                imageIndex={imageIndex}
                setImageIndex={setImageIndex}
                onPress={() => setModalVisible(!modalVisible)}
                loading={loading}
              />
              <View style={styles.contentContainer}>
                <View style={styles.heading}>
                  <Heading size={20} topSpace={20} bold>
                    {product.title}
                  </Heading>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity
                    style={{ marginTop: 5 }}
                    onPress={() => handleToggleProductLike()}
                  >
                    <MaterialCommunityIcons
                      name={productLiked ? "heart" : "heart-outline"}
                      size={25}
                      color={colors.danger}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.heading}>
                  <Heading color="secondaryTheme" size={20} bold>
                    {product.price}$
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
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text
                    size={12}
                    color="green"
                    style={{ fontWeight: 700, opacity: 0.85 }}
                  >
                    Fast Delivery{" "}
                  </Text>
                  <MaterialCommunityIcons
                    style={{ opacity: 0.85 }}
                    name="truck-fast-outline"
                    color={colors.green}
                    size={25}
                  />
                </View>
                <View style={styles.content}>
                  <Heading bottomSpace={5}>Description</Heading>
                  <Text>{product.description}</Text>
                </View>
              </View>
            </View>
            <View style={styles.suggestedProducts}>
              <Heading color="primaryTheme" bold>
                Products within the same category
              </Heading>

              {similarProducts.length > 0 ? (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={similarProducts}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View style={{ width: 200 }}>
                      <ProductCard
                        product={item}
                        onPress={handleSimilarProductPress}
                      />
                    </View>
                  )}
                />
              ) : (
                <Heading
                  color="mediumGrayText"
                  align="center"
                  topSpace={50}
                  bottomSpace={50}
                >
                  No similar Products found.
                </Heading>
              )}
            </View>
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
          <Modal visible={modalVisible} transparent>
            <ImageViewer
              swipeDownThreshold={100}
              enableSwipeDown
              index={imageIndex}
              onSwipeDown={() => setModalVisible(!modalVisible)}
              imageUrls={product.images.map((url) => ({
                url,
                width: 0,
                height: 0,
              }))}
            />
          </Modal>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={30} color={colors.primaryTheme} />
        </View>
      )}
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
    paddingTop: 5,
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
  content: { marginTop: 30 },
  suggestedProducts: { marginTop: 40, marginBottom: 70, paddingHorizontal: 20 },
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
