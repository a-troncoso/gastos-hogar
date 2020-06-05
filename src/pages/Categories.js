import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import CategoriesList from "../domain/category/CategoriesList";
import { fetchAllCategories } from "../dbOperations/category/categoryBDTransactions";

const Categories = props => {
  const { navigation } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
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
    alignSelf: "stretch"
  },
  categoriesListView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16
  }
});

export default Categories;
