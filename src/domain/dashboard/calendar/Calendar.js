import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import MonthView from "./MonthView";
import YearView from "./YearView";

const Calendar = props => {
  const { view, month, year, relevantDays, relevantMonths } = props;

  const getView = () => {
    return {
      month: (
        <MonthView month={month} year={year} relevantDays={relevantDays} />
      ),
      year: <YearView year={year} relevantMonths={relevantMonths} />
      // year: <YearView year={year} />
    }[view];
  };

  return <View>{getView()}</View>;
};

const styles = StyleSheet.create({
  main: {
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1
  }
});

export default Calendar;
