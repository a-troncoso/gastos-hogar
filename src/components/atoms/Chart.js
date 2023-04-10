import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { VictoryPie } from "victory-native";
import { StyleSheet, View, Text } from "react-native";
import Svg from "react-native-svg";

import { toCurrencyFormat } from "../../utils/number";

import color from "../../assets/colors";

const ChartLabel = ({ label }) => {
  const [width, setWidth] = useState(0);
  const [heigth, setHeight] = useState(0);
  const meassure = event => {
    setWidth(event.nativeEvent.layout.width);
    setHeight(event.nativeEvent.layout.height);
  };

  return (
    <View
      onLayout={meassure}
      style={{
        // borderColor: "green",
        // borderStyle: "solid",
        // borderWidth: 1,
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        maxWidth: 180,
        transform: [
          { translateX: -(width / 2) + 20 },
          { translateY: -(heigth / 2) },
        ],
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {label && label.value}
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {label && label.text}
      </Text>
    </View>
  );
};

const Chart = props => {
  const { data } = props;
  const [label, setLabel] = useState({ value: 0, text: "" });
  const [externalMutation, setExternalMutation] = useState([]);

  const [parsedData, setParsedData] = useState(
    data.map(d => ({ x: d.category, y: d.totalAmount }))
  );

  useEffect(() => {
    setParsedData(data.map(d => ({ x: d.category, y: d.totalAmount })));
    setLabel(
      data[0] && {
        value: toCurrencyFormat(data[0].totalAmount),
        text: data[0].category,
      }
    );
  }, [data]);

  return (
    <View style={styles.chart}>
      <VictoryPie
        data={parsedData}
        containerComponent={
          <Svg
            height="400"
            width="100%"
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        }
        innerRadius={90}
        padAngle={4}
        labels={() => null}
        externalEventMutations={externalMutation}
        events={[
          {
            target: "data",
            eventHandlers: {
              onPress: () => {
                return [
                  {
                    mutation: props => {
                      setLabel({
                        value: toCurrencyFormat(props.datum.y),
                        text: props.datum.x,
                      });
                    },
                  },
                  {
                    target: "data",
                    childName: ["pie"],
                    mutation: () => {
                      setExternalMutation([
                        {
                          target: "data",
                          eventKey: "all",
                          mutation: () => {
                            return { innerRadius: 100 };
                          },
                          callback: setExternalMutation(undefined),
                        },
                      ]);
                    },
                  },
                ];
              },
            },
          },
        ]}
        colorScale={[
          color["blue"][0],
          color["blue"][10],
          color["blue"][20],
          color["blue"][30],
          color["blue"][40],
          color["blue"][50],
          color["blue"][60],
        ]}
      />
      <ChartLabel label={label} />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    // borderColor: "cyan",
    // borderStyle: "solid",
    // borderWidth: 1,
    // position: "relative",
  },
});

Chart.defaultProps = {
  data: [],
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Chart;
