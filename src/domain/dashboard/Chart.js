import React, { useEffect, useState } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryLabel
} from "victory-native";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Chart = props => {
  const { data } = props;

  const [parsedData, setParsedData] = useState(
    data.map(d => ({ x: d.category, y: d.totalAmount }))
  );

  useEffect(() => {
    setParsedData(data.map(d => ({ x: d.category, y: d.totalAmount })));
  }, [data]);

  return (
    <View style={styles.chart}>
      <VictoryPie
        data={parsedData}
        innerRadius={40}
        labelRadius={({ innerRadius }) => innerRadius + 105}
        labelComponent={
          <VictoryLabel
            labelPlacement="parallel"
            angle={-55}
            textAnchor="middle"
          />
        }
        style={{
          labels: { fill: "black", fontSize: 12 }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {}
});

export default Chart;
