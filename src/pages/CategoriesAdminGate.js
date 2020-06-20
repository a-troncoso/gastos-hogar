import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CategoriesList from "../domain/category/CategoriesList";
import { fetchAllCategories } from "../dbOperations/category/categoryBDTransactions";

const CategoriesAdminGate = props => {
  const { navigation } = props;

  const [categories, setCategories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const fetchCategories = async () => {
    const categories = await fetchAllCategories();
    setCategories(categories);
  };

  const handlePressCategory = id => {
    navigation.navigate("CategoryDetail", {
      categoryId: id
    });
  };

  const handlePressAddCategory = () => {
    navigation.navigate("NewCategory");
  };

  return (
    <View style={styles.categories}>
      <View style={styles.categoriesListView}>
        <SafeAreaView>
          <CategoriesList
            categories={categories}
            features={["add-category"]}
            onPressCategory={handlePressCategory}
            onPressAddCategory={handlePressAddCategory}
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
    paddingHorizontal: 16
  }
});

export default CategoriesAdminGate;
