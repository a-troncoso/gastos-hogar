import React, { useState, useCallback } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { CategoriesList } from "../components";
import Button from "../../../components/atoms/Button";

import { categoryConstants, categoryLocalDB } from "../data";
import screenNames from "../../../navigation/screenNames";

const CategoriesAdminGate = props => {
  const { navigation } = props;

  const [categories, setCategories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const fetchCategories = async () => {
    const categories = await categoryLocalDB.fetchAllCategories();
    setCategories(categories);
  };

  const handlePressCategory = id => {
    pushCategoryDetailScreen({
      categoryId: id,
      mode: categoryConstants.CATEGORY_DETAIL_MODES.EXISTING_CATEGORY,
    });
  };

  const handlePressAddCategory = () => {
    pushCategoryDetailScreen({
      mode: categoryConstants.CATEGORY_DETAIL_MODES.NEW_CATEGORY,
    });
  };

  const pushCategoryDetailScreen = ({
    categoryId,
    mode = categoryConstants.CATEGORY_DETAIL_MODES.NEW_CATEGORY,
  }) => {
    navigation.push(
      screenNames.CategoryManagementStackScreenNavigator.CategoryDetail,
      { categoryId, mode }
    );
  };

  return (
    <View style={styles.categories}>
      <View style={styles.categoriesListView}>
        <SafeAreaView>
          <CategoriesList
            categories={categories}
            onPressCategory={handlePressCategory}
            onPressAddCategory={handlePressAddCategory}
          />
        </SafeAreaView>
      </View>
      <View style={styles.fixedBottomArea}>
        <Button onPress={handlePressAddCategory}>
          <Text style={styles.mainBtnText}>AGREGAR OTRA</Text>
        </Button>
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
  },
  categoriesListView: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 16,
  },
  fixedBottomArea: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  mainBtnText: {
    fontWeight: "bold",
  },
});

export default CategoriesAdminGate;
