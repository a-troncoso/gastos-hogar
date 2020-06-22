import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateNavigator from "../domain/shared/DateNavigator";

import { formattedMonth, currentDate } from "../utils/date";

const DateFilterSelector = props => {
  const { filter, onChangeMode } = props;

  const [filterBy, setFilterBy] = useState("month");

  useEffect(() => {
    if (filter) setFilterBy(filter);
  }, [filter]);

  useEffect(() => {
    if (filterBy) onChangeMode(filterBy);
  }, [filterBy]);

  const handlePressBtn = filter => {
    setFilterBy(filter);
  };

  return (
    <View style={dateFilterSelectorStyles.dateFilterSelectorView}>
      <TouchableOpacity
        onPress={() => handlePressBtn("day")}
        style={[
          dateFilterSelectorStyles.btn,
          filterBy === "day" && dateFilterSelectorStyles.activeBtn
        ]}
      >
        <View style={dateFilterSelectorStyles.dateFilterSelectorDayView}>
          <Text>DÍA</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressBtn("month")}
        style={[
          dateFilterSelectorStyles.btn,
          filterBy === "month" && dateFilterSelectorStyles.activeBtn
        ]}
      >
        <View style={dateFilterSelectorStyles.dateFilterSelectorMonthView}>
          <Text>MES</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressBtn("year")}
        style={[
          dateFilterSelectorStyles.btn,
          filterBy === "year" && dateFilterSelectorStyles.activeBtn
        ]}
      >
        <View style={dateFilterSelectorStyles.dateFilterSelectorYearView}>
          <Text>AÑO</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const dateFilterSelectorStyles = StyleSheet.create({
  dateFilterSelectorView: {
    flexDirection: "row"
  },
  dateFilterSelectorDayView: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderStyle: "solid"
  },
  dateFilterSelectorMonthView: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1
  },
  dateFilterSelectorYearView: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid"
  },
  activeBtn: {
    backgroundColor: "gray"
  },
  btn: {
    flex: 1
  }
});

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

const Chart = props => {
  const {} = props;
  return <View style={chartStyles.chart}>
    <Text>CHART</Text>
  </View>;
};

const chartStyles = StyleSheet.create({
  chart: {}
});

const DashbhoardGate = () => {
  const [viewMode, setViewMode] = useState("month");
  const [dateSelected, setDateSelected] = useState(currentDate);

  const trans = {
    day: "día",
    month: "mes",
    year: "año"
  };

  useEffect(() => {}, [dateSelected]);

  const handeChangleMode = mode => {
    setViewMode(mode);
  };

  return (
    <View>
      <DateNavigator
        filter={viewMode}
        date={dateSelected}
        onChangeDate={date => setDateSelected(date)}
      />
      <DateFilterSelector onChangeMode={e => handeChangleMode(e)} />
      <DashboardCard
        value={`$ 47.000`}
        description={`total ${trans[viewMode]}`}
      />
      <Chart />
    </View>
  );
};

export default DashbhoardGate;
