import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import {
  Image,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const screenHeight =
  Math.round(Dimensions.get("window").height) - Constants.statusBarHeight;

const PurchaseImagesModal = ({ route, navigation }) => {
  const [idxActiveImage, setIdxActiveImage] = useState(0);

  const { images } = route.params;

  useEffect(() => {
    // if (idxActiveImage === images.length - 1) navigation.goBack();
  }, [idxActiveImage]);

  const handlePressMainImage = () => {
    setIdxActiveImage(idxActiveImage + 1);
  };

  return (
    <View style={styles.purchaseImagesModal}>
      <TouchableWithoutFeedback onPress={handlePressMainImage}>
        <Image
          style={styles.purchaseImagesModalMainImage}
          source={{ uri: images[0] }}
        />
      </TouchableWithoutFeedback>
      <View style={styles.purchaseImagesModalSecondaryImagesView}>
        {images.map((i, idx) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.purchaseImagesModalSecondaryImageView,
              idxActiveImage === idx ? styles.withBorder : {}
            ]}
            onPress={() => {
              setIdxActiveImage(idx);
            }}
          >
            <Image
              style={styles.purchaseImagesModalMiniImage}
              source={{ uri: i }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  purchaseImagesModal: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  purchaseImagesModalMainImage: {
    height: screenHeight * 0.8 - 16,
    backgroundColor: "#E8E8E8"
  },
  purchaseImagesModalSecondaryImagesView: {
    height: screenHeight * 0.2 + 16,
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 8,
    justifyContent: "space-between"
  },
  purchaseImagesModalSecondaryImageView: {
    width: 100,
    height: 100,
    backgroundColor: "#E8E8E8"
  },
  purchaseImagesModalMiniImage: {
    width: "100%",
    height: "100%"
  },
  withBorder: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  }
});

export default PurchaseImagesModal;
