import React from "react";
import { StyleSheet, View, Text } from "react-native";
import color from "../../utils/styles/color";

const DatePicker = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.pickerContainer}>
        <Text>20</Text>
        <Text>Septiembre</Text>
        <Text>2020</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    resizeMode: 'cover',
    flex: 1,
    // width: null,
    // height: null,
    paddingHorizontal: 16,
    backgroundColor: color.gray["140"]
  },
  pickerContainer: {
    height: 500,
    backgroundColor: color.gray["0"]
  }
});
export default DatePicker;
