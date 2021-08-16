import React, { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native"

import { extractNumbers, thousandFormat } from "../../utils/number"

const EditableAmount = ({ amount, editedAmount, onChange, onBlur }) => {
  const [isVisibleEditableElm, setIsVisibleEditableElm] = useState(false)
  const [maskedValue, setMaskedValue] = useState(editedAmount)

  useEffect(() => {
    const valueOnInput = thousandFormat(
      extractNumbers(editedAmount),
      0,
      ",",
      "."
    )
    if (editedAmount <= 1000000000) setMaskedValue(valueOnInput)
  }, [editedAmount])

  const handlePressExpenseAmount = () => {
    setIsVisibleEditableElm(true)
  }

  const handleBlurTextInput = () => {
    setIsVisibleEditableElm(false)
    onBlur()
  }

  const handleChangeTextInput = e => {
    onChange(extractNumbers(e))
  }

  return (
    <TouchableOpacity
      style={styles.amountTouchable}
      onPress={handlePressExpenseAmount}
    >
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
  )
}

const styles = StyleSheet.create({
  amountTouchable: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingVertical: 8
  },
  amountViewContainer: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    flexDirection: "row",
    justifyContent: "center"
  },
  currencySymbol: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5
  },
  amountStyles: {
    // borderColor: "brown",
    // borderWidth: 1,
    // borderStyle: "solid",
    color: "red",
    fontSize: 14,
    fontWeight: "bold"
  },
  amountTextInput: {
    // borderColor: "green",
    // borderWidth: 1,
    // borderStyle: "solid",
    height: 19,
    marginRight: 1,
    lineHeight: 19
  },
  amountNoEditable: {
    lineHeight: 19,
    minWidth: 22
  }
})

export default EditableAmount
