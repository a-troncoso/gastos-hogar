import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import DateSelector from "../../atoms/DateModalSelector";
import color from "../../../utils/styles/color";

const DateNavigatorActivator = props => {
  const { mode, date, test } = props;

  const [isDatePickerVisible, setIsDatePickerVisible] = useState();

  const DayText = () => {
    return (
      <>
        <Text>20</Text>
        <View>
          <Text>Septiembre</Text>
          <Text>2020</Text>
        </View>
      </>
    );
  };

  const MonthText = () => {
    return (
      <>
        <Text>Septiembre</Text>
        <Text>2020</Text>
      </>
    );
  };

  const YearText = () => {
    return (
      <>
        <Text>2020</Text>
      </>
    );
  };

  const modes = {
    DAY: <DayText />,
    MONTH: <MonthText />,
    YEAR: <YearText />
  };

  const handleOpenDatePicker = () => {
    setIsDatePickerVisible(true);
    test();
  };

  return (
    <>
      {isDatePickerVisible && <DateSelector />}
      <View style={dateNavigatorActivatorStyles.mainView}>
        <TouchableOpacity
          style={dateNavigatorActivatorStyles.activator}
          onPress={handleOpenDatePicker}
        >
          {modes[mode]}
        </TouchableOpacity>
      </View>
    </>
  );
};

const dateNavigatorActivatorStyles = StyleSheet.create({
  mainView: {},
  activator: {
    width: 150,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: color.blue["30"],
    borderRadius: 8
  }
});

export default DateNavigatorActivator;
