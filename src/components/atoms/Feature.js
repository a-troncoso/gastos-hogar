import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import color from "../../utils/styles/color";

const Feature = props => {
  const {
    name,
    value,
    voidValue,
    onPressFeature,
    editableElement,
    isVisibleEditableElm
  } = props;

  // const [isVisibleEditableElement, setIsVisibleEditableElement] = useState(
  //   false
  // );

  useEffect(() => {
    console.log("isVisibleEditableElm", isVisibleEditableElm);
  }, [isVisibleEditableElm]);

  const handlePressFeature = () => {
    // setIsVisibleEditableElement(!isVisibleEditableElement);
    onPressFeature();
  };

  const displayedValue = () => {
    return value || voidValue;
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
          {!isVisibleEditableElm && displayedValue()}
        </Text>
        {isVisibleEditableElm && editableElement}
      </View>
    </TouchableOpacity>
  );
};

Feature.defaultProps = {
  value: "",
  voidValue: "",
  editableElement: <></>,
  onPressFeature: () => null
};

Feature.propTypes = {
  name: PropTypes.string.isRequired,
  isVisibleEditableElm: PropTypes.bool.isRequired,
  value: PropTypes.string,
  voidValue: PropTypes.string,
  editableElement: PropTypes.element,
  onPressFeature: PropTypes.func
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
