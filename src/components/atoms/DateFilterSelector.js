import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

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
        style={[styles.btn, filterBy === "day" && styles.activeBtn]}
      >
        <View style={styles.dateFilterSelectorDayView}>
          <Text>DÍA</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressBtn("month")}
        style={[styles.btn, filterBy === "month" && styles.activeBtn]}
      >
        <View style={styles.dateFilterSelectorMonthView}>
          <Text>MES</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePressBtn("year")}
        style={[styles.btn, filterBy === "year" && styles.activeBtn]}
      >
        <View style={styles.dateFilterSelectorYearView}>
          <Text>AÑO</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default DateFilterSelector;
