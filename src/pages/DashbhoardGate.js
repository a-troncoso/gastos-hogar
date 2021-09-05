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

import { currentDate, formattedMonthNumber } from "../utils/date";
import { toCurrencyFormat } from "../utils/number";

const dateTranslation = {
  day: "día",
  month: "mes",
  year: "año",
};

const DashboardCard = props => {
  const { value, description } = props;
  return (
    <View style={dashboardCardStyles.dashboardCard}>
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
    padding: 16,
    backgroundColor: color["blue"][20],
    borderRadius: 16,
  },
  dashboardCardContent: {
    // borderColor: "green",
    // borderStyle: "solid",
    // borderWidth: 1,
    alignItems: "center",
  },
  dashboardCardValue: {
    fontSize: 32,
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
  // Almacena la fecha separada en mdía, mes, año como attrs. de objetos
  const [formatedDateSelected, setFormatedDateSelected] = useState({
    day: dateSelected.getDate(),
    month: formattedMonthNumber(dateSelected.getMonth() + 1, {
      inTwoDigits: true,
    }),
    year: dateSelected.getFullYear(),
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountsPerCategory, setAmountsPerCategory] = useState([]);
  const [relevantByDateCriteria, setRelevantByDateCriteria] = useState([]);
  const [isRequiredDataRequested, setIsRequiredDataRequested] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!isRequiredDataRequested) _fetchRequiredData();
    }, [])
  );

  useEffect(() => {
    const _formatedDateSelected = {
      day: dateSelected.getDate(),
      month: formattedMonthNumber(dateSelected.getMonth() + 1, {
        inTwoDigits: true,
      }),
      year: dateSelected.getFullYear(),
    };
    setFormatedDateSelected(_formatedDateSelected);
  }, [dateSelected]);

  useEffect(() => {
    if (!isRequiredDataRequested) _fetchRequiredData();
  }, [formatedDateSelected]);

  useEffect(() => {
    _fetchTotalAmount({
      mode: viewMode,
      date: formatedDateSelected,
    });
    _fetchTotalAmountPerCategory({
      mode: viewMode,
      date: formatedDateSelected,
    });
    _fetchAmounts({ mode: viewMode, date: formatedDateSelected });
  }, [viewMode]);

  const _fetchRequiredData = async () => {
    setIsRequiredDataRequested(true);
    await _fetchTotalAmount({ mode: viewMode, date: formatedDateSelected });
    // await _fetchTotalAmountPerCategory({
    //   mode: viewMode,
    //   date: formatedDateSelected
    // });
    // await _fetchAmounts({ mode: viewMode, date: formatedDateSelected });
    setIsRequiredDataRequested(false);
  };

  const handeChangleMode = mode => {
    setViewMode(mode);
  };

  const _fetchTotalAmount = async dateOptions => {
    try {
      const totalAmountInfo = await fetchTotalAmountByDateCriteria({
        ...dateOptions,
      });
      setTotalAmount(totalAmountInfo.totalAmount);
    } catch (err) {
      alerts.throwErrorAlert("calcular el monto total", JSON.stringify(err));
    }
  };

  const _fetchTotalAmountPerCategory = async dateOptions => {
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
        <View style={{ paddingHorizontal: 16, paddingBottom: 64 }}>
          <View style={{ marginVertical: 16 }}>
            <DateFilterSelector onChangeMode={e => handeChangleMode(e)} />
          </View>
          <DashboardCard
            value={totalAmount || 0}
            description={`total ${dateTranslation[viewMode]}`}
          />
          {amountsPerCategory && amountsPerCategory.length > 0 && (
            <Chart data={amountsPerCategory} />
          )}
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
    backgroundColor: color.blue["90"],
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1
  },
  dashboardScrollView: {
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1
  },
});

export default DashbhoardGate;
