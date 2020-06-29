import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import DateNavigator from "../domain/shared/DateNavigator";
import DateFilterSelector from "../domain/shared/DateFilterSelector";
import Chart from "../domain/dashboard/Chart";
import Calendar from "../domain/dashboard/Calendar";

import { currentDate } from "../utils/date";

const DashboardCard = props => {
  const { value, description } = props;
  return (
    <View style={dashboardCardStyles.dashboardCard}>
      <View style={dashboardCardStyles.dashboardCardContent}>
        <Text style={dashboardCardStyles.dashboardCardValue}>{value}</Text>
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

  const dateTranslation = {
    day: "día",
    month: "mes",
    year: "año"
  };

  const handeChangleMode = mode => {
    setViewMode(mode);
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
          value={`$ 47.000`}
          description={`total ${dateTranslation[viewMode]}`}
        />
        <Chart />
        <Calendar
          view={viewMode}
          month={dateSelected.getMonth()}
          year="2021"
          relevantMonths={[
            { month: 0, relevance: 1 },
            { month: 1, relevance: 5 },
            { month: 2, relevance: 9 },
            { month: 3, relevance: 5 },
            { month: 4, relevance: 2 },
            { month: 5, relevance: 3 },
            { month: 6, relevance: 1 },
            { month: 7, relevance: 1 },
            { month: 8, relevance: 5 },
            { month: 9, relevance: 4 }
          ]}
          relevantDays={[
            { day: 2, relevance: 1 },
            { day: 15, relevance: 5 },
            { day: 30, relevance: 9 },
            { day: 6, relevance: 5 },
            { day: 8, relevance: 2 },
            { day: 3, relevance: 3 },
            { day: 21, relevance: 1 },
            { day: 19, relevance: 1 },
            { day: 29, relevance: 5 },
            { day: 7, relevance: 4 }
          ]}
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
