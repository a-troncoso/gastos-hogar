import React, { useRef, useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from "react-native"

import color from "../../assets/colors"

const Button = props => {
  const { children, type, onPress } = props

  return (
    <TouchableOpacity
      style={[styles.saveBtn, { ...styles[type] }]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  saveBtn: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    backgroundColor: color.blue["20"],
    borderRadius: 8
  },
  danger: {
    backgroundColor: color.red[20]
  }
})

export default Button
