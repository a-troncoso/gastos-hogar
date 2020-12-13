import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import DateNavigator from "../components/molecules/date/DateNavigator";
import DateFilterSelector from "../components/atoms/DateFilterSelector";
import Chart from "../domain/dashboard/Chart";
import Calendar from "../domain/dashboard/calendar/Calendar";

import alerts from "../utils/alerts/Alerts";

import {
  fetchTotalAmountByDateCriteria,
  fetchTotalAmountByDateCriteriaPerCategory,
  fetchAmountsByDateCriteria
} from "../dbOperations/purchase/purchaseBDTransactions";

import { currentDate, formattedMonth } from "../utils/date";
import { toCurrencyFormat } from "../utils/number";

const dateTranslation = {
  day: "día",
  month: "mes",
  year: "año"
};

const DashboardCard = props => {
  const { value, description } = props;
  return (
    <View style={dashboardCardStyles.dashboardCard}>
      <View style={dashboardCardStyles.dashboardCardContent}>
        <Text style={dashboardCardStyles.dashboardCardValue}>
          {toCurrencyFormat(value)}
        </Text>
        <Text style={dashboardCardStyles.dashboardCardDesc}>
          {description.toUpperCase()}
        </Text>
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
    backgroundColor: "gray"
  },
  dashboardCardContent: {
    // borderColor: "green",
    // borderStyle: "solid",
    // borderWidth: 1,
    alignItems: "center"
  },
  dashboardCardValue: {
    fontSize: 24
  },
  dashboardCardDesc: {
    fontSize: 16
  }
});

const DashbhoardGate = () => {
  const [viewMode, setViewMode] = useState("month");
  const [dateSelected, setDateSelected] = useState(currentDate);
  // Almacena la fecha separada en mdía, mes, año como attrs. de objetos
  const [formatedDateSelected, setFormatedDateSelected] = useState({
    day: dateSelected.getDate(),
    month: formattedMonth(dateSelected.getMonth(), true),
    year: dateSelected.getFullYear()
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
      month: formattedMonth(dateSelected.getMonth(), true),
      year: dateSelected.getFullYear()
    };
    setFormatedDateSelected(_formatedDateSelected);
  }, [dateSelected]);

  useEffect(() => {
    if (!isRequiredDataRequested) _fetchRequiredData();
  }, [formatedDateSelected]);

  useEffect(() => {
    _fetchTotalAmount({
      mode: viewMode,
      date: formatedDateSelected
    });
    _fetchTotalAmountPerCategory({
      mode: viewMode,
      date: formatedDateSelected
    });
    _fetchAmounts({ mode: viewMode, date: formatedDateSelected });
  }, [viewMode]);

  const _fetchRequiredData = async () => {
    setIsRequiredDataRequested(true);
    await _fetchTotalAmount({ mode: viewMode, date: formatedDateSelected });
    await _fetchTotalAmountPerCategory({
      mode: viewMode,
      date: formatedDateSelected
    });
    await _fetchAmounts({ mode: viewMode, date: formatedDateSelected });
    setIsRequiredDataRequested(false);
  };

  const handeChangleMode = mode => {
    setViewMode(mode);
  };

  const _fetchTotalAmount = async dateOptions => {
    try {
      const totalAmountInfo = await fetchTotalAmountByDateCriteria({
        ...dateOptions
      });
      setTotalAmount(totalAmountInfo.totalAmount);
    } catch (err) {
      console.err(err);
      alerts.throwErrorAlert("calcular el monto total", JSON.stringify(err));
    }
  };

  const _fetchTotalAmountPerCategory = async dateOptions => {
    try {
      const amountsPerCategory = await fetchTotalAmountByDateCriteriaPerCategory(
        {
          ...dateOptions
        }
      );

      const processedList = amountsPerCategory.filter(a => a.totalAmount > 0);
      setAmountsPerCategory(processedList);
    } catch (err) {
      alerts.throwErrorAlert("calcular montos por categoría", JSON.stringify(err));
    }
  };

  const _fetchAmounts = async dateOptions => {
    try {
      const amounts = await fetchAmountsByDateCriteria({
        ...dateOptions
      });

      const processedList = amounts.map(a => {
        let date = new Date(a.date);

        return {
          day: new Date(date).getDate(),
          month: new Date(date).getMonth(),
          relevance: a.totalAmount
        };
      });
      setRelevantByDateCriteria(processedList);
    } catch (err) {
      alerts.throwErrorAlert("calcular los montos", JSON.stringify(err));
    }
  };

  return (
    <SafeAreaView style={styles.dashboardScrollViewContainer}>
      <ScrollView style={styles.dashboardScrollView}>
        <DateNavigator
          filter={viewMode}
          date={dateSelected}
          onChangeDate={date => setDateSelected(date)}
        />
        <DateFilterSelector onChangeMode={e => handeChangleMode(e)} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dashboardScrollViewContainer: {
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1
  },
  dashboardScrollView: {
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1
  }
});

export default DashbhoardGate;
