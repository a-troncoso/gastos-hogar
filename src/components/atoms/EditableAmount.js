import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { extractNumbers, thousandFormat } from "../../utils/number";
import color from "../../assets/colors";

const EditableAmount = ({ amount, editedAmount, onChange, onBlur }) => {
  const [isVisibleEditableElm, setIsVisibleEditableElm] = useState(false);
  const [maskedValue, setMaskedValue] = useState(editedAmount);

  useEffect(() => {
    const valueOnInput = thousandFormat(
      extractNumbers(editedAmount),
      0,
      ",",
      "."
    );
    if (editedAmount <= 1000000000) setMaskedValue(valueOnInput);
  }, [editedAmount]);

  const handlePressExpenseAmount = () => {
    setIsVisibleEditableElm(true);
  };

  const handleBlurTextInput = () => {
    setIsVisibleEditableElm(false);
    onBlur();
  };

  const handleChangeTextInput = e => {
    onChange(extractNumbers(e));
  };

  return (
    <TouchableOpacity
      style={styles.amountTouchable}
      onPress={handlePressExpenseAmount}
    >
      <Text style={styles.featureName}>Monto</Text>
      <View style={styles.amountViewContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        {isVisibleEditableElm ? (
          <TextInput
            style={[styles.amountStyles, styles.amountTextInput]}
            keyboardType="numeric"
            value={maskedValue}
            // value={editedAmount}
            onChangeText={handleChangeTextInput}
            onBlur={handleBlurTextInput}
            autoFocus
          />
        ) : (
          <Text style={[styles.amountStyles, styles.amountNoEditable]}>
            {thousandFormat(extractNumbers(amount), 0, ",", ".")}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  amountTouchable: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingVertical: 16,
    gap: 8,
  },
  featureName: {
    color: color.gray["110"],
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  amountViewContainer: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  currencySymbol: {
    color: color.green["0"],
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  amountStyles: {
    // borderColor: "brown",
    // borderWidth: 1,
    // borderStyle: "solid",
    height: 19,
    color: color.green["0"],
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  amountTextInput: {
    // borderColor: "green",
    // borderWidth: 1,
    // borderStyle: "solid",
    height: 19,
    // lineHeight: 19,
  },
  amountNoEditable: {
    lineHeight: 19,
    minWidth: 22,
  },
});

export default EditableAmount;
