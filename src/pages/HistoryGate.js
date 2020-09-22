import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CategoriesList from "../domain/category/CategoriesList";
import Hero from "../domain/shared/Hero";
import DateNavigatorActivator from "../domain/shared/DateNavigatorActivator";
import Constants from "expo-constants";
import { fetchTotalPurchasesByCategory } from "../dbOperations/purchase/purchaseBDTransactions";
import { formattedMonth, currentDate } from "../utils/date";
import color from "../utils/styles/color";

const HistoryGate = props => {
  const { navigation } = props;

  const [categories, setCategories] = useState([]);
  const [dateSelected, setDateSelected] = useState(currentDate);

  useFocusEffect(
    useCallback(() => {
      fetchTotalPurchases(formattedMonth(dateSelected.getMonth(), true));
    }, [])
  );

  useEffect(() => {
    fetchTotalPurchases(formattedMonth(dateSelected.getMonth(), true));
  }, [dateSelected]);

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

  const handleTest = () => {
    navigation.navigate("PurchaseImagesModal", {
      images: []
    });
  };

  return (
    <View style={styles.mainView}>
      <Hero
        button={
          <DateNavigatorActivator
            mode="MONTH"
            date={currentDate}
            test={handleTest}
          />
        }
      />
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
  mainView: {
    flex: 1,
    backgroundColor: color.blue["90"]
  },

  categoriesListView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16
  }
});

export default HistoryGate;
