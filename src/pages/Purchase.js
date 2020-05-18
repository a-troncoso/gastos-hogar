import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions
} from "react-native";
// import Constants from "expo-constants";
import { toAmount } from "../utils/number";



// TODO: This must be obtained from DB
const purchaseData = {
  id: "1",
  image: "img",
  date: "21 de Junio",
  amount: toAmount(500),
  subcategory: "Subcategoría",
  images: ["img1", "img2", "img3"]
};

const Purchase = props => {
  const { route, navigation } = props;

  console.info("[LOG] Purchase ID", route.params.purchaseId);

  const features = {
    date: { name: "Fecha" },
    amount: { name: "Monto" },
    subcategory: { name: "Subcategoría" }
  };

  // const PurchaseImageModalContent = () => {
  //   const [idxActiveImage, setIdxActiveImage] = useState(0);

  //   const handlePressMainImage = () => {
  //     console.log("idxActiveImage", idxActiveImage);
  //     setIdxActiveImage(idxActiveImage + 1);
  //   };

  //   return (
  //     <View style={styles.imageModal}>
  //       <TouchableWithoutFeedback onPress={handlePressMainImage}>
  //         <View style={styles.imageModalMainImageView}>
  //           <Text>{purchaseData.images[0]}</Text>
  //         </View>
  //       </TouchableWithoutFeedback>
  //       <View style={styles.imageModalSecondaryImagesView}>
  //         {purchaseData.images.map((i, idx) => (
  //           <View
  //             key={i}
  //             style={[
  //               styles.imageModalSecondaryImageView,
  //               idxActiveImage === idx ? styles.withBorder : {}
  //             ]}
  //           >
  //             <Text>{i}</Text>
  //           </View>
  //         ))}
  //       </View>
  //     </View>
  //   );
  // };

  const handlePressImageTouchable = () => {
    navigation.navigate("PurchaseImagesModal", {
      images: purchaseData.images
    });
  };

  return (
    <View style={styles.purchase}>
      <TouchableOpacity
        style={styles.purchaseImageTouchable}
        onPress={handlePressImageTouchable}
      >
        <Text>img</Text>
      </TouchableOpacity>
      <View style={styles.purchaseFeaturesView}>
        {Object.keys(features).map(f => (
          <View key={f} style={styles.featureView}>
            <Text>{features[f].name}</Text>
            <Text>{purchaseData[f]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  purchase: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  purchaseImageTouchable: {
    height: 160,
    alignSelf: "stretch",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#E8E8E8"
  },
  purchaseFeaturesView: {
    flex: 1,
    padding: 8
  },
  featureView: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  }
  // imageModal: {
  //   flex: 1,
  //   justifyContent: "space-between",
  //   backgroundColor: "#fff"
  // },
  // imageModalMainImageView: {
  //   height: screenHeight * 0.8 - 16,
  //   borderColor: "black",
  //   borderStyle: "solid",
  //   borderWidth: 1,
  //   backgroundColor: "#E8E8E8"
  // },
  // imageModalSecondaryImagesView: {
  //   height: screenHeight * 0.2 + 16,
  //   flexDirection: "row",
  //   paddingTop: 8,
  //   paddingBottom: 16,
  //   paddingHorizontal: 8,
  //   justifyContent: "space-between"
  // },
  // imageModalSecondaryImageView: {
  //   width: 100,
  //   height: 100,
  //   backgroundColor: "#E8E8E8"
  // },
  // withBorder: {
  //   borderColor: "black",
  //   borderStyle: "solid",
  //   borderWidth: 1
  // }
});

export default Purchase;
