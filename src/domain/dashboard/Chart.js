import React, { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory-native";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

const Chart = props => {
  const {} = props;
  return (
    <View style={styles.chart}>
      {/* <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart> */}

      <VictoryPie
        data={[
          { x: 1, y: 2, label: "Comida" },
          { x: 2, y: 3, label: "Aseo" },
          { x: 3, y: 5, label: "Salud" },
          { x: 3, y: 5, label: "Entretención" }
        ]}
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
