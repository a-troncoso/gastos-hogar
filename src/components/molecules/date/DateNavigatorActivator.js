import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import DateModalSelector from "../../atoms/DateModalSelector";

import color from "../../../assets/colors";
import { monthName } from "../../../utils/date";

const DayText = ({ date }) => {
  return (
    <>
      <Text style={{ fontWeight: "bold" }}>{date.getDate()}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{ textTransform: "capitalize", marginRight: 4, fontSize: 12 }}
        >
          {monthName(date.getMonth())}
        </Text>
        <Text style={{ fontSize: 12 }}>{date.getFullYear()}</Text>
      </View>
    </>
  );
};

const MonthText = ({ date }) => {
  return (
    <>
      <Text style={{ textTransform: "capitalize" }}>
        {monthName(date.getMonth())}
      </Text>
    </>
  );
};

const YearText = ({ date }) => {
  return (
    <>
      <Text>{date.getFullYear()}</Text>
    </>
  );
};

const DateNavigatorActivator = props => {
  const { mode, date, onChange } = props;

  const [isDateModalSelectorVisible, setIsDateModalSelectorVisible] =
    useState(false);

  const modes = date => ({
    DAY: <DayText date={date} />,
    MONTH: <MonthText date={date} />,
    YEAR: <YearText date={date} />,
  });

  const handleOpenDatePicker = () => {
    setIsDateModalSelectorVisible(true);
  };

  const handleChangeSelectedDate = date => {
    onChange(date);
    setIsDateModalSelectorVisible(false);
  };

  const handleBackdropPress = () => {
    setIsDateModalSelectorVisible(false);
  };

  return (
    <>
      <View style={styles.mainView}>
        <TouchableOpacity
          style={styles.activator}
          onPress={handleOpenDatePicker}
        >
          {modes(date)[mode]}
        </TouchableOpacity>
      </View>
      {isDateModalSelectorVisible && (
        <DateModalSelector
          date={date}
          mode={mode}
          isModalVisible={isDateModalSelectorVisible}
          onChange={date => handleChangeSelectedDate(date)}
          onBackdropPress={handleBackdropPress}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    // borderWidth: 1,
    // borderColor: "blue",
  },
  activator: {
    width: 150,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: color.blue["30"],
    borderRadius: 8,
  },
});

export default DateNavigatorActivator;
