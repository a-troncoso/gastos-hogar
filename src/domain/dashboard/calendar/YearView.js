import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import Row from "../../shared/Row";

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
    <View style={styles.main}>
      <MonthsTable relevantMonths={relevantMonths} />
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

export default YearView;
