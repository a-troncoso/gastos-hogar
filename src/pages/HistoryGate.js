import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CategoriesList from "../components/molecules/category/CategoriesList";
import Hero from "../components/atoms/Hero";
import DateNavigatorActivator from "../components/molecules/date/DateNavigatorActivator";
import alerts from "../components/atoms/Alerts";

import { fetchTotalExpensesByCategory } from "../dbOperations/purchase/purchaseBDTransactions";

import { currentDate } from "../utils/date";
import color from "../assets/colors";

const HistoryGate = props => {
  const { navigation } = props;

  const [categories, setCategories] = useState([]);
  const [dateSelected, setDateSelected] = useState(currentDate());

  useFocusEffect(
    useCallback(() => {
      fetchTotalPurchases(dateSelected);
    }, [fetchTotalPurchases, dateSelected])
  );

  useEffect(() => {
    fetchTotalPurchases(dateSelected);
  }, [fetchTotalPurchases, dateSelected]);

  const fetchTotalPurchases = useCallback(
    async date => {
      try {
        const categories = await fetchTotalExpensesByCategory({
          date,
          mode: "month",
        });
        setCategories(categories);
      } catch (err) {
        alerts.throwErrorAlert(
          "calcular el total de egresos por categoría",
          JSON.stringify(err)
        );
      }
    },
    [fetchTotalExpensesByCategory, alerts]
  );

  const handlePressCategory = useCallback(
    id => {
      navigation.push("Expenses", {
        categoryId: id,
        date: dateSelected,
        mode: "month",
      });
    },
    [navigation, dateSelected]
  );

  const handleChangeDateNavigation = useCallback(date => {
    setDateSelected(date);
  }, []);

  return (
    <View style={styles.mainView}>
      <Hero
        button={
          <DateNavigatorActivator
            mode="MONTH"
            date={dateSelected}
            onChange={date => handleChangeDateNavigation(date)}
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
    backgroundColor: color.blue["90"],
  },

  categoriesListView: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default HistoryGate;
