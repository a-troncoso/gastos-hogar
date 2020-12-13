import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

const Row = props => {
  const { labels, isLastRow } = props;

  const Cell = props => {
    const { data, isLastCell } = props;

    if (typeof data === "object")
      return (
        <View
          style={[
            styles.cell,
            data.score ? styles[`cellScore${data.score}`] : {},
            isLastCell ? styles.borderRight : {},
            isLastRow ? styles.borderBottom : {}
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
            isLastRow ? styles.borderBottom : {}
          ]}
        >
          <Text style={styles.cellLabel}>{data}</Text>
        </View>
      );
  };

  return (
    <View style={styles.row}>
      {labels.map((l, i) => (
        <Cell data={l} key={i} isLastCell={i === labels.length - 1} />
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

export default Row;
