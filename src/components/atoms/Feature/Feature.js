import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"

import color from "../../../assets/colors"

const Feature = props => {
  const {
    name,
    value,
    voidValue,
    editableElement,
    isVisibleEditableElm,
    aditionalValue,
    isUnsavedFeature,
    prefix,
    onPressFeature
  } = props

  const handlePressFeature = () => {
    onPressFeature()
  }

  const ValueText = () => <Fragment>{value || voidValue}</Fragment>

  return (
    <TouchableOpacity testID="touchable" onPress={handlePressFeature}>
      <View style={[styles.view, isUnsavedFeature && styles.unsaveFeature]}>
        <Text testID="feature-name-text" style={styles.featureName}>
          {name}
        </Text>
        <View style={styles.valueView}>
          {prefix && (
            <Text style={{ ...styles.featureName, paddingRight: 5 }}>
              {prefix}
            </Text>
          )}
          <Text
            style={[
              styles.featureValue,
              value ? styles.existValue : styles.notExistValue
            ]}
          >
            {!isVisibleEditableElm && <ValueText />}
          </Text>
          {aditionalValue && (
            <Text style={styles.aditionalValueText}>{aditionalValue}</Text>
          )}
        </View>
        {isVisibleEditableElm && (
          <Fragment>{editableElement}</Fragment>
        )}
      </View>
    </TouchableOpacity>
  )
}

Feature.defaultProps = {
  isVisibleEditableElm: false,
  value: "",
  voidValue: "",
  aditionalValue: false,
  editableElement: <></>,
  onPressFeature: () => undefined
}

Feature.propTypes = {
  name: PropTypes.string.isRequired,
  isVisibleEditableElm: PropTypes.bool,
  value: PropTypes.string,
  voidValue: PropTypes.string,
  aditionalValue: PropTypes.bool,
  editableElement: PropTypes.element,
  onPressFeature: PropTypes.func
}

const styles = StyleSheet.create({
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
  unsaveFeature: {
    borderColor: color.yellow["30"]
  },
  valueView: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid"
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
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
    fontWeight: "bold"
    // textTransform: "capitalize"
  },
  aditionalValueText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "bold",
    color: color.gray["110"]
  },
  existValue: {
    color: color.gray["140"]
  },
  notExistValue: {
    color: color.gray["80"]
  }
})

export default Feature
