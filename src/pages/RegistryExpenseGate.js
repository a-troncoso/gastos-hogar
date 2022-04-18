import React, { useState, useCallback, useEffect } from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  ToastAndroid,
  Button,
} from "react-native";
import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from "@react-navigation/native";

import CategoriesList from "../components/molecules/category/CategoriesList";

import { fetchAllCategories } from "../dbOperations/category/categoryBDTransactions";
import apiDomain from "../utils/apiDomain";

import color from "../assets/colors";

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
    return null;
  }
  return null;
};

const RegistryExpenseGate = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [visibleToast, setVisibleToast] = useState(false);
  const apiCategories = apiDomain("category");

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  useEffect(() => {
    if (route.params && route.params.evt === "PURCHASE_SAVED") {
      setVisibleToast(true);
      navigation.setParams({ evt: "" });
    }
  }, [route.params]);

  useEffect(() => setVisibleToast(false), [visibleToast]);

  const fetchCategories = async () => {
    const categories = await apiCategories.fetch();
    setCategories(categories);
  };

  const handlePressCategory = id => {
    navigation.push("ExpenseDetail", {
      categoryId: id,
      mode: "NEW_EXPENSE",
    });
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.categoriesListView}>
        <SafeAreaView>
          <CategoriesList
            categories={categories}
            onPressCategory={handlePressCategory}
          />
        </SafeAreaView>
        <Toast visible={visibleToast} message="Egreso ingresado" />
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
    paddingHorizontal: 16
  }
})

export default RegistryExpenseGate
