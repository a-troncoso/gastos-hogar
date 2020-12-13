import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from "react-native";

import color from "../../utils/styles/color";

const Button = props => {
  const { children, onPress } = props;

  return (
    <TouchableOpacity style={styles.saveBtn} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

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
  }
});

export default Button;