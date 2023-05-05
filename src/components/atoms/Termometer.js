import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";

import color from "../../assets/colors";

const termConfig = [
  {
    min: 0,
    max: 39,
    color: color.green[0],
  },
  {
    min: 40,
    max: 79,
    color: color.yellow[0],
  },
  {
    min: 80,
    max: 100,
    color: color.red[0],
  },
];

const Thermometer = ({ maxValue, value }) => {
  const [temperature, setTemperature] = useState({
    value: 0,
    color: "green",
    overValue: 0,
  });

  useEffect(() => {
    getThermometerStyles(value, maxValue);
  }, [value, maxValue]);

  const getThermometerStyles = useCallback((value, maxValue) => {
    const division = parseInt(((value * 100) / maxValue).toFixed());
    const percentage = Number.isFinite(division) ? division : 0;

    const config = termConfig.find(
      ({ min, max }) => min <= percentage && max >= percentage
    );

    setTemperature(prev => ({
      ...prev,
      value: percentage <= 100 ? percentage : 100,
      overValue: percentage - 100,
      color: config ? config.color : "red",
    }));
  }, []);

  return (
    <View style={thermometerStyles.thermometer}>
      <View
        style={[
          thermometerStyles.temperature,
          {
            width: `${temperature.value}%`,
            backgroundColor: temperature.color,
          },
        ]}
      />

      {temperature.overValue > 0 && (
        <Text style={thermometerStyles.overValue}>
          +{temperature.overValue}%
        </Text>
      )}
    </View>
  );
};

const thermometerStyles = StyleSheet.create({
  thermometer: {
    height: 8,
    width: "95%",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    justifyContent: "center",
  },
  temperature: {
    height: "100%",
    borderRadius: 8,
  },
  overValue: {
    position: "absolute",
    left: "100%",
    paddingLeft: 4,
    color: color.red[0],
    fontSize: 8,
  },
});

export default Thermometer;
