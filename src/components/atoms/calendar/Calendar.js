import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import MonthView from "./MonthView";
import YearView from "./YearView";

const Calendar = props => {
  const { view, month, year, relevantDays, relevantMonths } = props;

  const [processedRelevantDays, setProcessedRelevantDays] =
    useState(relevantDays);
  const [processedRelevantMonths, setProcessedRelevantMonths] =
    useState(relevantMonths);

  useEffect(() => {
    const _processedRelevantDays = relevantDays.map(rd => ({
      day: rd.day,
      month: rd.month,
      relevance: calculatedRelevance(rd.relevance),
    }));
    setProcessedRelevantDays(_processedRelevantDays);
  }, [relevantDays]);

  useEffect(() => {
    const _processedRelevantMonths = relevantMonths.map(rd => ({
      day: rd.day,
      month: rd.month,
      relevance: calculatedRelevance(rd.relevance),
    }));
    setProcessedRelevantMonths(_processedRelevantMonths);
  }, [relevantMonths]);

  const calculatedRelevance = relevance => {
    const maxSupportedRelevance = 9;
    const maxRelevance = Math.max(...relevantDays.flatMap(rd => rd.relevance));
    const incrementRange = maxRelevance / maxSupportedRelevance;

    const rangesList = Array(maxSupportedRelevance);

    let i = 0;
    let tmpMaxRange = 0;

    while (tmpMaxRange <= maxRelevance) {
      let range = Array(2);
      range[0] = tmpMaxRange;
      tmpMaxRange = tmpMaxRange + incrementRange;
      range[1] = tmpMaxRange;
      rangesList[i] = range;
      i = i + 1;
    }

    let finalRelevance = 0;

    for (let i = 0; i < rangesList.length; i++) {
      if (relevance >= rangesList[i][0] && relevance < rangesList[i][1]) {
        finalRelevance = i;
        break;
      }
    }

    return finalRelevance;
  };

  const getView = () => {
    return {
      month: (
        <MonthView
          month={month}
          year={year}
          relevantDays={processedRelevantDays}
        />
      ),
      year: <YearView year={year} relevantMonths={processedRelevantMonths} />,
    }[view];
  };

  return <View>{getView()}</View>;
};

const styles = StyleSheet.create({
  main: {
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1
  },
});

export default Calendar;
