import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { scale } from "react-native-size-matters";
import colors from "../config/colors";

const { width } = Dimensions.get("window");

interface AppCarouselProps {
  data: any;
  autoPlay?: boolean;
  onPress?: () => void;
  loading: boolean;
  imageIndex: number;
  setImageIndex: (index: number) => void;
}

const AppCarousel: React.FC<AppCarouselProps> = ({
  data,
  onPress,
  autoPlay = false,
  loading,
  imageIndex,
  setImageIndex,
}) => {
  return (
    <View style={styles.carouselContainer}>
      {loading ? (
        <ActivityIndicator size={scale(25)} color={colors.primaryTheme} />
      ) : (
        <>
          <Carousel
            loop
            autoPlay={autoPlay}
            height={width / 1.8}
            width={width}
            data={data}
            scrollAnimationDuration={100}
            onSnapToItem={(index) => setImageIndex(index)}
            renderItem={({ item }: { item: string }) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
                onPress={onPress}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={{
                      uri: item,
                    }}
                    height={width / 1.8}
                    width={width}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
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
                      index === imageIndex
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
    marginBottom: scale(10),
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
