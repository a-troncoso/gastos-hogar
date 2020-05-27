import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  fetchPurchaseById,
  patchPurchaseAmount
} from "../dbOperations/purchase/purchaseBDTransactions";
import { toCurrencyFormat } from "../utils/number";
import { formatDate } from "../utils/date";

const Purchase = props => {
  const { route, navigation } = props;

  const [purchase, setPurchase] = useState([]);
  const [amountEditMode, setAmountEditMode] = useState(false);
  const [amountValueEdited, setAmountValueEdited] = useState("");

  useEffect(() => {
    _fetchPurchase(route.params.purchaseId);
  }, []);

  const _fetchPurchase = async purchaseId => {
    const purchase = await fetchPurchaseById(purchaseId);
    setPurchase({
      ...purchase,
      amount: toCurrencyFormat(purchase.amount),
      subcategory: purchase.subcategory || "-"
    });
  };

  const handlePressImageTouchable = () => {
    navigation.navigate("PurchaseImagesModal", {
      images: [purchase.image]
    });
  };

  const handlePressAmount = () => {
    setAmountEditMode(true);
  };

  const handleSubmitEditAmount = async () => {
    const patchResult = await patchPurchaseAmount(
      route.params.purchaseId,
      amountValueEdited
    );
    if (patchResult === "OK") {
      setAmountEditMode(false);
      _fetchPurchase(route.params.purchaseId);
    }
  };

  return (
    <View style={styles.purchase}>
      <TouchableOpacity
        style={styles.purchaseImageTouchable}
        onPress={handlePressImageTouchable}
      >
        <Image style={styles.purchaseImage} source={{ uri: purchase.image }} />
      </TouchableOpacity>
      <View style={styles.purchaseFeaturesView}>
        <View style={styles.featureView}>
          <Text>Fecha</Text>
          <Text>{formatDate(purchase.date)}</Text>
        </View>
        <TouchableOpacity
          style={styles.featureView}
          onPress={handlePressAmount}
        >
          <Text>Monto</Text>
          {!amountEditMode ? (
            <Text>{purchase.amount}</Text>
          ) : (
            <TextInput
              style={styles.purchaseAmountInput}
              value={amountValueEdited}
              autoFocus={true}
              keyboardType="number-pad"
              onChangeText={value => setAmountValueEdited(value)}
              onSubmitEditing={handleSubmitEditAmount}
            />
          )}
        </TouchableOpacity>
        <View style={styles.featureView}>
          <Text>Subcategoría</Text>
          <Text>{purchase.subcategory}</Text>
        </View>
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
  purchaseImage: {
    width: "100%",
    height: "100%"
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
  },
  purchaseAmountInput: {
    textAlign: "right"
  },
  border: { borderColor: "red", borderStyle: "solid", borderWidth: 1 }
});

export default Purchase;
