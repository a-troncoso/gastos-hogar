import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { Screen, DashboardCard, CategoryIcon } from "../components/atoms/";
import { useExpenses, useIncomes, useCategories } from "../hooks/";
import { currentDate, formattedMonthNumber } from "../utils/date";
import color from "../assets/colors";
import ScreenNames from "../navigation/screenNames";
import { isJsonString } from "../utils/object";

const date = {
  day: currentDate().getDate(),
  month: formattedMonthNumber(currentDate().getMonth() + 1, {
    inTwoDigits: true,
  }),
  year: currentDate().getFullYear(),
};

const Home = () => {
  const navigation = useNavigation();

  const { fetchTotalExpenses, totalAmount } = useExpenses();
  const { fetchTotalIncomes, totalIncome } = useIncomes();
  const { categories, fetchCategories } = useCategories();

  useFocusEffect(
    useCallback(() => {
      fetchTotalExpenses({ mode: "month", date });
      fetchTotalIncomes({ mode: "month", date });
      fetchCategories();
    }, [])
  );

  const handlePressCategory = categoryId => {
    navigation.navigate(ScreenNames.MainStackScreenNavigator.RegistryExpense, {
      screen: ScreenNames.RegistryExpenseStackNavigator.ExpenseDetail,
      params: {
        categoryId,
        mode: "NEW_EXPENSE",
      },
    });
  };

  return (
    <Screen>
      <View style={styles.incomesExpensesCardsContainer}>
        <DashboardCard
          backgroundColor={color.green[50]}
          value={totalIncome}
          description="ingresos mes actual"
        />
        <DashboardCard
          backgroundColor={color.red[60]}
          value={totalAmount}
          description="egresos mes actual"
        />
      </View>
      <DashboardCard
        backgroundColor={color.green[40]}
        value={totalIncome - totalAmount}
        description="disponible mes actual"
      />
      {categories.length > 0 && (
        <View>
          <Text style={styles.registryExpenseTitle}>Registrar egreso</Text>
          <View style={styles.categoriesContainer}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handlePressCategory(category.id)}
              >
                <CategoryIcon
                  key={category.id}
                  iconName={category.imagePath}
                  iconFamily={
                    isJsonString(category.extraData)
                      ? JSON.parse(category.extraData).imageIconFamily
                      : ""
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  incomesExpensesCardsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  registryExpenseTitle: {
    marginVertical: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  categoriesContainer: {
    borderRadius: 8,
    gap: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Home;
