import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CategoriesList from "../domain/category/CategoriesList";
import { fetchTotalPurchasesByCategory } from "../dbOperations/purchase/purchaseBDTransactions";
import { currentMonth } from "../utils/date";

const History = props => {
  const { navigation } = props;
  const [categories, setCategories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchTotalPurchases(currentMonth(true));
    }, [])
  );

  const fetchTotalPurchases = async month => {
    try {
      const categories = await fetchTotalPurchasesByCategory(month);

      setCategories(categories);
    } catch (err) {}
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
  },
  categoriesListView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16,
    backgroundColor: "#fff"
  }
});

export default History;
