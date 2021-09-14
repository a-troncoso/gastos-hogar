import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import color from "../../assets/colors";

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
    <View style={styles.dateFilterSelectorView}>
      <TouchableOpacity
        onPress={() => handlePressBtn("day")}
        style={[
          styles.btn,
          styles.dateFilterSelectorDayView,
          filterBy === "day" && styles.activeBtn,
        ]}
      >
        <Text>DÍA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressBtn("month")}
        style={[
          styles.btn,
          styles.dateFilterSelectorMonthView,
          filterBy === "month" && styles.activeBtn,
        ]}
      >
        <Text>MES</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressBtn("year")}
        style={[
          styles.btn,
          styles.dateFilterSelectorYearView,
          filterBy === "year" && styles.activeBtn,
        ]}
      >
        <Text>AÑO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateFilterSelectorView: {
    flexDirection: "row",
  },
  dateFilterSelectorDayView: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: color["blue"][40],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderStyle: "solid",
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
  },
  dateFilterSelectorMonthView: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: color["blue"][40],
    borderStyle: "solid",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  dateFilterSelectorYearView: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: color["blue"][40],
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  activeBtn: {
    backgroundColor: color["blue"][50],
  },
  btn: {
    flex: 1,
    backgroundColor: color["gray"][0],
  },
});

export default DateFilterSelector;
