import React, { useState } from "react"
import { StyleSheet, View } from "react-native"

import color from "../../utils/styles/color"

const Hero = props => {
  const { childStyles, central, button } = props

  return (
    <View
      style={[
        styles.hero,
        central ? styles.withCentral : {},
        button ? styles.withButton : {},
        { ...childStyles }
      ]}
    >
      <View style={styles.superiorPart}></View>
      {central}
      {button}
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    alignItems: "center"
  },
  superiorPart: {
    // borderColor: "green",
    // borderWidth: 1,
    // borderStyle: "solid",
    position: "absolute",
    width: "100%",
    height: "50%",
    alignItems: "center",
    backgroundColor: color.blue["50"]
  },
  withCentral: {
    // height: 112
  },
  withButton: {
    // height: 64
  }
})

export default Hero
