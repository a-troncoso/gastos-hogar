import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import DateNavigator from "../components/molecules/date/DateNavigator";
import DateFilterSelector from "../components/atoms/DateFilterSelector";
import Chart from "../components/atoms/Chart";
import Calendar from "../components/atoms/calendar/Calendar";
import Hero from "../components/atoms/Hero";
import DateNavigatorActivator from "../components/molecules/date/DateNavigatorActivator";

import alerts from "../components/atoms/Alerts";
import color from "../assets/colors";

import {
  fetchTotalAmountByDateCriteria,
  fetchTotalAmountByDateCriteriaPerCategory,
  fetchAmountsByDateCriteria,
} from "../dbOperations/purchase/purchaseBDTransactions";
import { fetchTotalIncomesByDateCriteria } from "../dbOperations/income/incomeBDTransactions";

import { currentDate, formattedMonthNumber } from "../utils/date";
import { toCurrencyFormat } from "../utils/number";

const dateTranslation = {
  day: "día",
  month: "mes",
  year: "año",
};

const DashboardCard = props => {
  const { backgroundColor, value, description } = props;

  return (
    <View style={[dashboardCardStyles.dashboardCard, { backgroundColor }]}>
      <View style={dashboardCardStyles.dashboardCardContent}>
        <Text style={dashboardCardStyles.dashboardCardValue}>
          {toCurrencyFormat(value)}
        </Text>
        <Text style={dashboardCardStyles.dashboardCardDesc}>{description}</Text>
      </View>
    </View>
  );
};

const dashboardCardStyles = StyleSheet.create({
  dashboardCard: {
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1,
    flex: 1,
    padding: 16,
    backgroundColor: color["blue"][20],
    borderRadius: 16,
    marginBottom: 8,
  },
  dashboardCardContent: {
    // borderColor: "green",
    // borderStyle: "solid",
    // borderWidth: 1,
    alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  dashboardCardValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dashboardCardDesc: {
    fontSize: 16,
    textTransform: "capitalize",
  },
});

const DashbhoardGate = () => {
  const [viewMode, setViewMode] = useState("month");
  const [dateSelected, setDateSelected] = useState(currentDate);
  // Almacena la fecha separada en día, mes, año como attrs. de objetos
  const [formattedDateSelected, setFormattedDateSelected] = useState({
    day: dateSelected.getDate(),
    month: formattedMonthNumber(dateSelected.getMonth() + 1, {
      inTwoDigits: true,
    }),
    year: dateSelected.getFullYear(),
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [amountsPerCategory, setAmountsPerCategory] = useState([]);
  const [relevantByDateCriteria, setRelevantByDateCriteria] = useState([]);

  useFocusEffect(
    useCallback(() => {
      _fetchRequiredData();
    }, [])
  );

  useEffect(() => {
    const _formattedDateSelected = {
      day: dateSelected.getUTCDate(),
      month: formattedMonthNumber(dateSelected.getUTCMonth() + 1, {
        inTwoDigits: true,
      }),
      year: dateSelected.getUTCFullYear(),
    };
    setFormattedDateSelected(_formattedDateSelected);
  }, [dateSelected]);

  useEffect(() => {
    _fetchTotalIncomes({ mode: viewMode, date: formattedDateSelected });
    _fetchTotalExpenses({
      mode: viewMode,
      date: formattedDateSelected,
    });
    _fetchTotalExpensesByCategory({
      mode: viewMode,
      date: formattedDateSelected,
    });
    _fetchAmounts({ mode: viewMode, date: formattedDateSelected });
  }, [viewMode, formattedDateSelected]);

  const _fetchRequiredData = async () => {
    _fetchTotalIncomes({ mode: viewMode, date: formattedDateSelected });
    _fetchTotalExpenses({ mode: viewMode, date: formattedDateSelected });
    _fetchTotalExpensesByCategory({
      mode: viewMode,
      date: formattedDateSelected,
    });
    _fetchAmounts({ mode: viewMode, date: formattedDateSelected });
  };

  const handleChangeMode = mode => {
    setViewMode(mode);
  };

  const _fetchTotalExpenses = async dateOptions => {
    try {
      const totalAmountInfo = await fetchTotalAmountByDateCriteria({
        ...dateOptions,
      });
      setTotalAmount(totalAmountInfo.totalAmount);
    } catch (err) {
      alerts.throwErrorAlert("calcular el monto total", JSON.stringify(err));
    }
  };

  const _fetchTotalIncomes = async dateOptions => {
    try {
      const totalAmountInfo = await fetchTotalIncomesByDateCriteria({
        ...dateOptions,
      });
      setTotalIncome(totalAmountInfo.rows?._array[0]?.totalAmount);
    } catch (err) {
      alerts.throwErrorAlert(
        "calcular el total de ingresos",
        JSON.stringify(err)
      );
    }
  };

  const _fetchTotalExpensesByCategory = async dateOptions => {
    try {
      const amountsPerCategory =
        await fetchTotalAmountByDateCriteriaPerCategory({
          ...dateOptions,
        });

      const processedList = amountsPerCategory.filter(a => a.totalAmount > 0);
      setAmountsPerCategory(processedList);
    } catch (err) {
      alerts.throwErrorAlert(
        "calcular montos por categoría",
        JSON.stringify(err)
      );
    }
  };

  const _fetchAmounts = async dateOptions => {
    try {
      const amounts = await fetchAmountsByDateCriteria({
        ...dateOptions,
      });

      const processedList = amounts.map(a => {
        let date = new Date(a.date);

        return {
          day: new Date(date).getDate(),
          month: new Date(date).getMonth(),
          relevance: a.totalAmount,
        };
      });
      setRelevantByDateCriteria(processedList);
    } catch (err) {
      alerts.throwErrorAlert("calcular los montos", JSON.stringify(err));
    }
  };

  const handleChangeDateNavigation = date => {
    setDateSelected(date);
  };

  const renderCalendarTitle = viewMode => {
    const titles = {
      month: "Egresos por día",
      year: "Egresos por año",
    };

    return (
      titles[viewMode] && (
        <Text style={styles.calendarTitle}>{titles[viewMode]}</Text>
      )
    );
  };

  return (
    <SafeAreaView style={styles.dashboardScrollViewContainer}>
      <Hero
        button={
          <DateNavigatorActivator
            mode={viewMode.toUpperCase()}
            date={dateSelected}
            onChange={date => handleChangeDateNavigation(date)}
          />
        }
      />
      <ScrollView style={styles.dashboardScrollView}>
        <View style={styles.dashboardView}>
          <View style={styles.dateFilterSelectorContainer}>
            <DateFilterSelector onChangeMode={e => handleChangeMode(e)} />
          </View>
          <View style={styles.incomesExpensesCardsContainer}>
            <DashboardCard
              backgroundColor={color["green"][50]}
              value={totalIncome || 0}
              description={`ingresos ${dateTranslation[viewMode]}`}
            />
            <DashboardCard
              backgroundColor={color["red"][60]}
              value={totalAmount || 0}
              description={`egresos ${dateTranslation[viewMode]}`}
            />
          </View>
          <DashboardCard
            backgroundColor={color["green"][40]}
            value={totalIncome - totalAmount || 0}
            description={`disponible ${dateTranslation[viewMode]}`}
          />
          {amountsPerCategory.length > 0 && <Chart data={amountsPerCategory} />}
          {renderCalendarTitle(viewMode)}
          <Calendar
            view={viewMode}
            month={dateSelected.getMonth()}
            year={dateSelected.getFullYear()}
            relevantMonths={relevantByDateCriteria}
            relevantDays={relevantByDateCriteria}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dashboardScrollViewContainer: {
    // borderColor: "blue",
    // borderWidth: 1,
    height: "100%",
    backgroundColor: color.blue["90"],
  },
  dashboardScrollView: {
    // borderColor: "red",
    // borderWidth: 1
  },
  dashboardView: { paddingHorizontal: 16, paddingBottom: 64 },
  dateFilterSelectorContainer: { marginVertical: 16 },
  incomesExpensesCardsContainer: { flexDirection: "row", gap: 8 },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 16,
  },
});

export default DashbhoardGate;
