import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import Row from "../../../components/atoms/Row";

const MonthView = props => {
  const DaysTable = props => {
    const { firstDay, lastDayData, relevantDays } = props;

    const [monthData, setMonthData] = useState([]);

    useEffect(() => {
      const monthStructure = _generateMonthDataStructure();
      if (relevantDays && Object.keys(relevantDays).length > 0)
        setMonthData(_generateMothStructureWithRelevantDays(monthStructure));
      else setMonthData(monthStructure);
    }, []);

    const _generateMothStructureWithRelevantDays = monthData => {
      const ms = [...monthData];

      ms.forEach(w => {
        w.forEach(d => {
          if (d)
            relevantDays.forEach(rd => {
              const relevantDayFormatted = new Date(
                firstDay.fullData.getFullYear(),
                firstDay.fullData.getMonth(),
                rd.day
              );

              if (relevantDayFormatted.getTime() === d.getTime())
                d.score = rd.relevance;
            });
        });
      });
      return ms;
    };

    const _generateMonthDataStructure = () => {
      let weekDataStructure = new Array(7);
      let monthDataStructure = new Array();
      let day = 1;
      const countMonthDays = lastDayData.fullData.getDate();
      weekDataStructure.fill(undefined);

      for (let j = firstDay.dayOfWeek - 1; j < weekDataStructure.length; j++) {
        weekDataStructure[j] = new Date(
          firstDay.fullData.getFullYear(),
          firstDay.fullData.getMonth(),
          day
        );
        day += 1;
      }
      monthDataStructure = monthDataStructure.concat([
        Array.from(weekDataStructure)
      ]);
      weekDataStructure.fill(undefined);

      while (day <= countMonthDays) {
        for (let k = 0; k < weekDataStructure.length; k++) {
          if (day <= countMonthDays) {
            weekDataStructure[k] = new Date(
              firstDay.fullData.getFullYear(),
              firstDay.fullData.getMonth(),
              day
            );
            day = day + 1;
          }
        }

        monthDataStructure = monthDataStructure.concat([
          Array.from(weekDataStructure)
        ]);
        weekDataStructure.fill(undefined);
      }

      return monthDataStructure;
    };

    return (
      <View>
        {monthData.map((w, i) => (
          <Row
            key={i}
            labels={w.map(d =>
              d ? { label: d.getDate(), score: d.score } : ""
            )}
            isLastRow={i === monthData.length - 1}
          />
        ))}
      </View>
    );
  };

  const { month, year, relevantDays } = props;

  const date = new Date(parseInt(year), parseInt(month), 1);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const firstDayData = {
    dayOfWeek: firstDay.getDay(),
    fullData: firstDay
  };
  const lastDayData = {
    dayOfWeek: lastDay.getDay(),
    fullData: lastDay
  };

  return (
    <View style={styles.main}>
      <Row labels={["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]} />
      <DaysTable
        firstDay={firstDayData}
        lastDayData={lastDayData}
        relevantDays={relevantDays}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1
  }
});

export default MonthView;
