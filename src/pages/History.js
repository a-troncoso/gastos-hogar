import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CategoriesList from "../domain/category/CategoriesList";
import { fetchTotalPurchasesByCategory } from "../dbOperations/purchase/purchaseBDTransactions";

const History = props => {
  const { navigation } = props;
  const [categories, setCategories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchTotalPurchases("05");
    }, [])
  );

  const fetchTotalPurchases = async month => {
    const categories = await fetchTotalPurchasesByCategory(month);
    setCategories(categories);
  };

  const handlePressCategory = id => {
    navigation.navigate("Purchases", {
      categoryId: id
    });
  };

  return (
    <View style={styles.categories}>
      <View style={styles.categoriesListView}>
        <SafeAreaView>
          <CategoriesList
            categories={categories}
            onPressCategory={handlePressCategory}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categories: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignSelf: "stretch"
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1
  },
  categoriesListView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16,
    backgroundColor: "#fff"
    // borderColor: "brown",
    // borderStyle: "solid",
    // borderWidth: 1,
  }
});

export default History;
