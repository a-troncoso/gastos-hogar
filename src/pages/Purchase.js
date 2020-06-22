import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Picker
} from "react-native";
import {
  fetchPurchaseById,
  patchPurchaseAmount,
  patchPurchaseCategory
} from "../dbOperations/purchase/purchaseBDTransactions";
import { toCurrencyFormat } from "../utils/number";
import { formatDate } from "../utils/date";
import { fetchAllCategories } from "../dbOperations/category/categoryBDTransactions";

const Purchase = props => {
  const { route, navigation } = props;

  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(0);
  const [purchase, setPurchase] = useState({});
  const [amountEditMode, setAmountEditMode] = useState(false);
  const [categoryEditMode, setCategoryEditMode] = useState(false);
  const [amountValueEdited, setAmountValueEdited] = useState("");

  useEffect(() => {
    _fetchPurchase(route.params.purchaseId);
    _fetchCategories();
  }, []);

  useEffect(() => {
    if (purchase.categoryId) setCategorySelected(purchase.categoryId);
  }, [purchase.categoryId]);

  const _fetchCategories = async () => {
    const categories = await fetchAllCategories();
    setCategories(categories);
  };

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
      images: purchase.images
    });
  };

  const handlePressAmount = () => {
    setAmountEditMode(true);
  };

  const callPatchService = async data => {
    let patchResult = "";

    if (data.field === "amount")
      patchResult = await patchPurchaseAmount(
        route.params.purchaseId,
        data.value
      );
    else if (data.field === "category")
      patchResult = await patchPurchaseCategory(
        route.params.purchaseId,
        data.value
      );

    if (patchResult === "OK") _fetchPurchase(route.params.purchaseId);
  };

  const handleSubmitEditAmount = () => {
    callPatchService({ field: "amount", value: amountValueEdited });
  };

  const handleChangeCategory = categoryId => {
    setCategorySelected(categoryId);
    callPatchService({ field: "category", value: categoryId });
  };

  return (
    <View style={styles.purchase}>
      <TouchableOpacity
        style={styles.purchaseImageTouchable}
        onPress={handlePressImageTouchable}
      >
        {purchase.images && (
          <Image
            style={styles.purchaseImage}
            source={{ uri: purchase.images[0] }}
          />
        )}
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
          <Text>Categoría</Text>
          <Picker
            style={styles.purchaseCategoryPicker}
            selectedValue={categorySelected}
            onValueChange={(categoryId, itemIndex) =>
              handleChangeCategory(categoryId)
            }
          >
            {categories.map((c, i) => (
              <Picker.Item key={i} label={c.name} value={c.id} />
            ))}
          </Picker>
        </View>
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
  purchaseCategoryPicker: {
    width: 200,
    height: 44,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    textAlign: "left"
  },
  border: { borderColor: "red", borderStyle: "solid", borderWidth: 1 }
});

export default Purchase;
