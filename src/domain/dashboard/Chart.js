import React, { useEffect, useState } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie
} from "victory-native";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Chart = props => {
  const { data } = props;

  const [parsedData] = useState(
    data.map(d => ({ x: d.category, y: d.totalAmount }))
  );

  return (
    <View style={styles.chart}>
      <VictoryPie
        data={parsedData}
        labelRadius={({ innerRadius }) => innerRadius + 4}
        radius={({ datum }) => 50 + datum.y * 20}
        innerRadius={40}
        style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {}
});

export default Chart;
