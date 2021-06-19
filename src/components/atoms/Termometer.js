import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"

import color from "../../assets/colors"

const Termometer = ({ maxValue, value }) => {
  const [temperature, setTemperature] = useState({
    value: 0,
    color: "green",
    overValue: 0
  })

  useEffect(() => {
    getTermometerStyles()
  }, [value])

  const termConfig = [
    {
      min: 0,
      max: 39,
      color: color.green[0]
    },
    {
      min: 40,
      max: 79,
      color: color.yellow[0]
    },
    {
      min: 80,
      max: 100,
      color: color.red[0]
    }
  ]

  const getTermometerStyles = () => {
    const percentage = ((value * 100) / maxValue).toFixed()

    const config = termConfig.find(
      ({ min, max }) => min <= percentage && max >= percentage
    )

    setTemperature(prev => ({
      ...prev,
      value: percentage <= 100 ? percentage : 100,
      overValue: percentage - 100,
      color: config ? config.color : "red"
    }))
  }

  return (
    <View style={termometerStyles.termometer}>
      <View
        style={[
          termometerStyles.temperature,
          { width: `${temperature.value}%`, backgroundColor: temperature.color }
        ]}
      ></View>

      {temperature.overValue > 0 && (
        <Text style={termometerStyles.overValue}>
          +{temperature.overValue}%
        </Text>
      )}
    </View>
  )
}

const termometerStyles = StyleSheet.create({
  termometer: {
    height: 8,
    width: "95%",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    justifyContent: "center"
  },
  temperature: {
    height: "100%",
    borderRadius: 8
  },
  overValue: {
    position: "absolute",
    left: "100%",
    paddingLeft: 4,
    color: color.red[0],
    fontSize: 8
  }
})

export default Termometer
