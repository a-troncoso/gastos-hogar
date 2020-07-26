import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import DateNavigator from "../domain/shared/DateNavigator";
import DateFilterSelector from "../domain/shared/DateFilterSelector";
import Chart from "../domain/dashboard/Chart";
import Calendar from "../domain/dashboard/calendar/Calendar";

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
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountsPerCategory, setAmountsPerCategory] = useState([]);
  const [relevantByDateCriteria, setRelevantByDateCriteria] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const date = {
        day: dateSelected.getDate(),
        month: formattedMonth(dateSelected.getMonth(), true),
        year: dateSelected.getFullYear()
      };
      fetchTotalAmount({ mode: viewMode, date });
      fetchTotalAmountPerCategory({ mode: viewMode, date });
      fetchAmounts({ mode: viewMode, date });
    }, [])
  );

  useEffect(() => {
    const date = {
      day: dateSelected.getDate(),
      month: formattedMonth(dateSelected.getMonth(), true),
      year: dateSelected.getFullYear()
    };

    fetchTotalAmount({
      mode: viewMode,
      date
    });
    fetchTotalAmountPerCategory({ mode: viewMode, date });
    fetchAmounts({ mode: viewMode, date });
  }, [viewMode]);

  const handeChangleMode = mode => {
    setViewMode(mode);
  };

  const fetchTotalAmount = async dateOptions => {
    try {
      const totalAmountInfo = await fetchTotalAmountByDateCriteria({
        ...dateOptions
      });
      setTotalAmount(totalAmountInfo.totalAmount);
    } catch (err) {
      console.err(err);
    }
  };

  const fetchTotalAmountPerCategory = async dateOptions => {
    try {
      const amountsByCategory = await fetchTotalAmountByDateCriteriaPerCategory(
        {
          ...dateOptions
        }
      );
      console.h1(amountsByCategory);
      console.h1(amountsByCategory.length);
      const processedList = amountsByCategory.filter(a => a.totalAmount > 0);
      setAmountsPerCategory(processedList);
    } catch (err) {
      console.err(err);
    }
  };

  const fetchAmounts = async dateOptions => {
    console.h1(dateOptions);
    try {
      const amounts = await fetchAmountsByDateCriteria({
        ...dateOptions
      });

      const processedList = amounts.map(a => ({
        day: new Date(a.day).getDate(),
        month: new Date(a.day).getMonth(),
        totalAmount,
        relevance: 5
      }));
      console.h1(amounts);
      console.h2(processedList);
      setRelevantByDateCriteria(processedList);
    } catch (err) {
      console.err(err);
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
