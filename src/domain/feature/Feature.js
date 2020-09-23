import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import color from "../../utils/styles/color";

const Feature = props => {
  const { name, value, voidValue, onPressFeature, editableElement } = props;

  const [isVisibleEditableElement, setIsVisibleEditableElement] = useState(
    false
  );

  const handlePressFeature = () => {
    setIsVisibleEditableElement(!isVisibleEditableElement);
    onPressFeature();
  };

  return (
    <TouchableOpacity onPress={() => handlePressFeature()}>
      <View style={featureStyles.view}>
        <Text style={featureStyles.featureName}>{name}</Text>
        <Text
          style={[
            featureStyles.featureValue,
            value ? featureStyles.existValue : featureStyles.notExistValue
          ]}
        >
          {value || voidValue}
        </Text>
      </View>
      {/* {isVisibleEditableElement && editableElement} */}
      {editableElement}
    </TouchableOpacity>
  );
};

const featureStyles = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: color.blue["60"],
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: color.gray["0"]
  },
  featureName: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    color: color.gray["110"],
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  featureValue: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  existValue: {
    color: color.gray["140"]
  },
  notExistValue: {
    color: color.gray["80"]
  }
});

export default Feature;
