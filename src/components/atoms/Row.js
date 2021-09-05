import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

import color from "../../assets/colors";

const Row = props => {
  const { labels, isLastRow, cellBackgroundColor, cellBorderColor } = props;
  console.log("labels", labels);

  const Cell = props => {
    const {
      data,
      isFirstCell,
      isLastCell,
      cellBackgroundColor,
      cellBorderColor,
    } = props;

    if (typeof data === "object")
      return (
        <View
          style={[
            styles.cell,
            data.score ? styles[`cellScore${data.score}`] : {},
            isLastCell ? styles.borderRight : {},
            isLastRow ? styles.borderBottom : {},
            {
              backgroundColor: cellBackgroundColor || "#fff",
              borderColor: cellBorderColor,
            },
            isLastRow && isLastCell && { borderBottomEndRadius: 16 },
            isLastRow && isFirstCell && { borderBottomStartRadius: 16 },
          ]}
        >
          <Text style={styles.cellLabel}>{data.label}</Text>
        </View>
      );
    else if (typeof data === "string")
      return (
        <View
          style={[
            styles.cell,
            isLastCell ? styles.borderRight : {},
            isLastRow ? styles.borderBottom : {},
            {
              backgroundColor: cellBackgroundColor || "#fff",
              borderColor: cellBorderColor,
            },
            isLastRow && isLastCell && { borderBottomEndRadius: 16 },
          ]}
        >
          <Text style={styles.cellLabel}>{data}</Text>
        </View>
      );
  };

  return (
    <View style={styles.row}>
      {labels.map((l, i) => (
        <Cell
          data={l}
          key={i}
          cellBackgroundColor={cellBackgroundColor}
          cellBorderColor={cellBorderColor}
          isFirstCell={i === 0}
          isLastCell={i === labels.length - 1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1,
    flex: 0,
    height: "auto",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
  },
  fixedHeight: {
    height: 40,
  },
  cellScore1: {
    backgroundColor: color["green"][60],
  },
  cellScore2: {
    backgroundColor: color["green"][50],
  },
  cellScore3: {
    backgroundColor: color["green"][40],
  },
  cellScore4: {
    backgroundColor: color["yellow"][40],
  },
  cellScore5: {
    backgroundColor: color["yellow"][30],
  },
  cellScore6: {
    backgroundColor: color["yellow"][20],
  },
  cellScore7: {
    backgroundColor: color["red"][20],
  },
  cellScore8: {
    backgroundColor: color["red"][10],
  },
  cellScore9: {
    backgroundColor: color["red"][0],
  },
  cellLabel: { color: "black" },
  borderRight: { borderRightWidth: 1 },
  borderBottom: { borderBottomWidth: 1 },
});

export default Row;
