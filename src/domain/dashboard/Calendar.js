import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import Row from "../shared/Row";

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
    <View style={calendarStyles.main}>
      <Row labels={["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]} />
      <DaysTable
        firstDay={firstDayData}
        lastDayData={lastDayData}
        relevantDays={relevantDays}
      />
    </View>
  );
};

const YearView = props => {
  const MonthsTable = props => {
    const { relevantMonths } = props;

    const [yearData, setYearData] = useState([]);

    const monthsPerRow = 4;
    const monthLabels = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic"
    ];

    useEffect(() => {
      const yearStructure = _generateYearDataStructure(monthsPerRow);

      if (relevantMonths && Object.keys(relevantMonths).length > 0)
        setYearData(_generateMothStructureWithRelevantMonths(yearStructure));
      else setYearData(yearStructure);
    }, []);

    const _generateMothStructureWithRelevantMonths = yearData => {
      const ms = [...yearData];

      ms.forEach(r => {
        r.forEach(m => {
          relevantMonths.forEach(rm => {
            if (rm.month === m.month) m.score = rm.relevance;
          });
        });
      });
      return ms;
    };

    const _generateYearDataStructure = _monthsPerRow => {
      let rowDataStructure = new Array(_monthsPerRow);
      rowDataStructure.fill(undefined);
      let yearDataStructure = new Array();

      let monthsCounter = 0;

      for (let i = 0; i < monthLabels.length / _monthsPerRow; i++) {
        for (let j = 0; j < rowDataStructure.length; j++) {
          rowDataStructure[j] = { month: monthsCounter };
          monthsCounter = monthsCounter + 1;
        }

        yearDataStructure = yearDataStructure.concat([
          Array.from(rowDataStructure)
        ]);
        rowDataStructure.fill(undefined);
      }
      return yearDataStructure;
    };

    return (
      <View>
        {yearData.map((r, i) => (
          <Row
            key={i}
            labels={r.map(m => {
              return { label: monthLabels[m.month], score: m.score };
            })}
            isLastRow={i === yearData.length - 1}
          />
        ))}
      </View>
    );
  };

  const { year, relevantMonths } = props;

  return (
    <View style={calendarStyles.main}>
      <MonthsTable relevantMonths={relevantMonths} />
    </View>
  );
};

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

const calendarStyles = StyleSheet.create({
  main: {
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1
  }
});

export default Calendar;
