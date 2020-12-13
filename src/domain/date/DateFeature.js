import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableHighlight,
//   TouchableOpacity,
//   Alert,
//   Picker
// } from "react-native";
import Feature from "../feature/Feature";
import DateSelector from "../../domain/shared/DateSelector";

const DateFeature = props => {
  const { date, onChange } = props;

  const [isEditableElementVisible, setIdEditatableElementVisible] = useState(
    false
  );

  const handleSelectDate = date => {
    // setIdEditatableElementVisible(false);
    onChange(date);
  };

  return (
    <Feature
      name="fecha"
      value={date.value}
      voidValue="sin registrar"
      isVisibleEditableElm={isEditableElementVisible}
      editableElement={
        <DateSelector
          isModalVisible={isEditableElementVisible}
          onBackdropPress={() => setIdEditatableElementVisible(false)}
          onChange={date => handleSelectDate(date)}
        />
      }
      onPressFeature={() => setIdEditatableElementVisible(true)}
    />
  );
};

export default DateFeature;
