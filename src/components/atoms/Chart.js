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
        transform: [
          { translateX: -(width / 2) + 20 },
          { translateY: -(heigth / 2) },
        ],
        justifyContent: "center",
      }}
    >
      {label &&
        label.map(text => (
          <Text
            key={text}
            style={{
              // borderColor: "yellow",
              // borderStyle: "solid",
              // borderWidth: 1,
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {text}
          </Text>
        ))}
    </View>
  );
};

const Chart = props => {
  const { data } = props;
  const [label, setLabel] = useState([]);
  const [externalMutation, setExternalMutation] = useState([]);

  const [parsedData, setParsedData] = useState(
    data.map(d => ({ x: d.category, y: d.totalAmount }))
  );

  useEffect(() => {
    setParsedData(data.map(d => ({ x: d.category, y: d.totalAmount })));
    setLabel(
      data[0] && [toCurrencyFormat(data[0].totalAmount), `${data[0].category}`]
    );
  }, [data]);

  return (
    <View style={styles.chart}>
      <Svg
        height="400"
        width="100%"
        style={{
          // borderColor: "pink",
          // borderStyle: "solid",
          // borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VictoryPie
          data={parsedData}
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
                        setLabel([
                          toCurrencyFormat(props.datum.y),
                          ` ${props.datum.x}`,
                        ]);
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
            color["blue"][10],
            color["blue"][30],
            color["blue"][50],
            color["blue"][70],
          ]}
        />
        <ChartLabel label={label} />
      </Svg>
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
