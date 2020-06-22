import React, { useState, useCallback } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CategoriesList from "../domain/category/CategoriesList";
import { fetchAllCategories } from "../dbOperations/category/categoryBDTransactions";

import Constants from "expo-constants";

const Categories = props => {
  const { navigation } = props;
  const [categories, setCategories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      _fetchCategories();
    }, [])
  );

  const _fetchCategories = async () => {
    const categories = await fetchAllCategories();
    setCategories(categories);
  };

  const handlePressCategory = id => {
    navigation.navigate("Scan", {
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
    alignSelf: "stretch",
    paddingTop: Constants.statusBarHeight
  },
  categoriesListView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16
  }
});

export default Categories;
