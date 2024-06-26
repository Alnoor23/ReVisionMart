import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { scale } from "react-native-size-matters";
import colors from "../config/colors";
import { Product } from "../api/types";

const { width } = Dimensions.get("window");

interface AppCarouselProps {
  data: any;
  loading: boolean;
}

const AppCarousel: React.FC<AppCarouselProps> = ({ data, loading }) => {
  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState<number>(0);

  return (
    <View style={styles.carouselContainer}>
      {loading ? (
        <ActivityIndicator size={scale(25)} color={colors.primaryTheme} />
      ) : (
        <>
          <Carousel
            loop
            autoPlay
            height={width / 1.8}
            width={width}
            data={data}
            scrollAnimationDuration={2000}
            onSnapToItem={(index) => setCarouselCurrentIndex(index)}
            renderItem={({ item }: { item: Product }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={{
                      uri: item.images[0],
                    }}
                    height={width / 1.8}
                    width={width}
                    resizeMode="center"
                  />
                </View>
              </View>
            )}
          />
          <View style={styles.dotsContainer}>
            {data?.map((_: any, index: React.Key | null | undefined) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === carouselCurrentIndex
                        ? colors.primaryTheme
                        : colors.lightGray,
                  },
                ]}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    backgroundColor: "#fff",
    height: 250,
    justifyContent: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    marginHorizontal: scale(4),
    opacity: 0.8,
  },
});

export default AppCarousel;
