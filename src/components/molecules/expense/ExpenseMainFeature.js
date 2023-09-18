import React from "react";
import { StyleSheet, View, TouchableHighlight, Image } from "react-native";
import EditableAmount from "../../atoms/EditableAmount";
// import ExpenseCamera from "../../atoms/Camera";

import color from "../../../assets/colors";

const ExpenseMainFeature = props => {
  const {
    pictures,
    amount,
    isUnsavedFeature,
    mode,
    onPressCamera,
    onChange,
    onBlurEditableAmount,
  } = props;

  const handleChangeEditableAmount = e => {
    onChange(e);
  };

  const handleBlurEditableAmount = () => {
    if (onBlurEditableAmount) onBlurEditableAmount();
  };

  return (
    <View style={[styles.view, isUnsavedFeature && styles.unsaveFeature]}>
      {/* <View style={styles.expenseCameraView}>
        <TouchableHighlight
          style={styles.cameraTouchable}
          onPress={() => onPressCamera()}
        >
          {mode === "NEW_EXPENSE" ? (
            <ExpenseCamera />
          ) : (
            <Image
              style={{ flex: 1, height: "100%" }}
              source={{ uri: pictures[0] }}
            />
          )}
        </TouchableHighlight>
      </View> */}
      <EditableAmount
        amount={amount}
        editedAmount={amount}
        onChange={handleChangeEditableAmount}
        onBlur={handleBlurEditableAmount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    width: 136,
    // height: 224,
    flexDirection: "column",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: color.gray["0"],
    shadowColor: color.gray["50"],
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  unsaveFeature: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: color.yellow["30"],
  },
  expenseCameraView: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
  },
  amount: {
    color: "red",
    borderStyle: "solid",
    textAlign: "center",
    fontWeight: "bold",
  },
  cameraTouchable: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
  },
});

export default ExpenseMainFeature;
