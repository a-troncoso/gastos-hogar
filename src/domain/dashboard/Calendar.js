import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { currentDate } from "../../utils/date";

const Row = props => {
  const { labels, isLastRow } = props;

  const Cell = props => {
    const { data, isLastCell } = props;

    if (typeof data === "object")
      return (
        <View
          style={[
            rowStyles.cell,
            data.score ? rowStyles[`cellScore${data.score}`] : {},
            isLastCell ? rowStyles.borderRight : {},
            isLastRow ? rowStyles.borderBottom : {}
          ]}
        >
          <Text style={rowStyles.cellLabel}>{data.label}</Text>
        </View>
      );
    else if (typeof data === "string")
      return (
        <View
          style={[
            rowStyles.cell,
            isLastCell ? rowStyles.borderRight : {},
            isLastRow ? rowStyles.borderBottom : {}
          ]}
        >
          <Text style={rowStyles.cellLabel}>{data}</Text>
        </View>
      );
  };

  return (
    <View style={rowStyles.row}>
      {labels.map((l, i) => (
        <Cell data={l} key={i} isLastCell={i === labels.length - 1} />
      ))}
    </View>
  );
};

const rowStyles = StyleSheet.create({
  row: {
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1,
    flex: 0,
    height: "auto",
    alignSelf: "stretch",
    flexDirection: "row"
  },
  cell: {
    flex: 1,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    alignSelf: "stretch",
    backgroundColor: "rgb(255, 255, 255)"
  },
  fixedHeight: {
    height: 40
  },
  cellScore1: {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  cellScore2: {
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  cellScore3: {
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  cellScore4: {
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  cellScore5: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  cellScore6: {
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  cellScore7: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  cellScore8: {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  cellScore9: {
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  },
  cellLabel: { color: "black" },
  borderRight: { borderRightWidth: 1 },
  borderBottom: { borderBottomWidth: 1 }
});

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

    const [monthData, setMonthData] = useState([]);

    useEffect(() => {}, []);

    const _generateMothStructureWithRelevantMonths = monthData => {};

    const _generateMonthDataStructure = () => {};

    return (
      <View>
        <Row
          labels={[
            { label: "Ene", score: 1 },
            { label: "Feb", score: 5 },
            { label: "Mar", score: 9 },
            { label: "Abr", score: 7 }
          ]}
        />
        <Row
          labels={[
            { label: "May", score: 2 },
            { label: "Jun", score: 3 },
            { label: "Jul", score: 1 },
            { label: "Ago", score: 2 }
          ]}
        />
        <Row
          labels={[
            { label: "Sep", score: 7 },
            { label: "Oct", score: 2 },
            { label: "Nov", score: 7 },
            { label: "Dic", score: 8 }
          ]}
        />
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
