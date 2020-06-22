import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CategoriesList from "../domain/category/CategoriesList";
import { fetchTotalPurchasesByCategory } from "../dbOperations/purchase/purchaseBDTransactions";
import { currentMonth, monthName, formattedMonth } from "../utils/date";
import { AntDesign } from "@expo/vector-icons";

import Constants from "expo-constants";

const DateLabel = props => {
  const { date } = props;

  const [_monthName, setMonthName] = useState("");

  useEffect(() => {}, [_monthName]);

  useEffect(() => {
    const month = date.getMonth();
    setMonthName(monthName(month).toUpperCase());
  }, [date]);

  return (
    <View style={styles.dateLabel}>
      <Text style={styles.dateLabelMonth}>{_monthName}</Text>
      <Text style={styles.dateLabelYear}>{date.getFullYear()}</Text>
    </View>
  );
};

const History = props => {
  const { navigation } = props;
  const date = new Date();

  const [categories, setCategories] = useState([]);
  const [dateSelected, setDateSelected] = useState(date);

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

  const handlePressMothNavigator = direction => {
    const newDate = new Date(dateSelected);
    newDate.setMonth(newDate.getMonth() + direction);
    setDateSelected(newDate);
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
      <View style={styles.categoriesMonthlyNavigator}>
        <View style={styles.categoriesMonthlyBtns}>
          <TouchableOpacity
            style={styles.categoriesMonthlyBtnNavigator}
            onPress={() => handlePressMothNavigator(-1)}
          >
            <AntDesign name="left" size={32} color="black" />
          </TouchableOpacity>
          <View>
            <DateLabel date={dateSelected} />
          </View>
          <TouchableOpacity
            style={styles.categoriesMonthlyBtnNavigator}
            onPress={() => handlePressMothNavigator(1)}
          >
            <AntDesign name="right" size={32} color="black" />
          </TouchableOpacity>
        </View>
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
  categoriesMonthlyNavigator: {
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1,
    height: "auto",
    flex: 0,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center"
  },
  categoriesMonthlyBtns: {
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1,
    height: "auto",
    flex: 0,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignSelf: "stretch",
    alignItems: "center"
  },
  categoriesListView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16,
    backgroundColor: "#fff"
  },
  dateLabel: { alignItems: "center" },
  dateLabelMonth: { fontSize: 18 },
  dateLabelYear: { fontSize: 12 },
  categoriesMonthlyBtnNavigator: {
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1,
    flex: 1,
    alignItems: "center"
  }
});

export default History;
