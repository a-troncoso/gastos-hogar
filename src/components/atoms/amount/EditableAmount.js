import React, { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"

const EditableAmount = ({ amount, editedAmount, onChange, onBlur }) => {
  const [isVisibleEditableElm, setIsVisibleEditableElm] = useState(false)

  const handlePressExpenseAmount = () => {
    setIsVisibleEditableElm(true)
  }

  const handleBlurTextInput = () => {
    setIsVisibleEditableElm(false)
    onBlur()
  }

  const handleChangeTextInput = e => {
    const numbers = e.match(/(\d+)/g)
    const amount = numbers ? numbers.join("") : ""
    onChange(amount)
  }

  return (
    <TouchableOpacity
      style={editableAmount.amountView}
      onPress={handlePressExpenseAmount}
    >
      {isVisibleEditableElm ? (
        <TextInput
          style={[editableAmount.amountStyles, editableAmount.textInput]}
          keyboardType="numeric"
          value={`$ ${editedAmount}`}
          onChangeText={handleChangeTextInput}
          onBlur={handleBlurTextInput}
          autoFocus
        />
      ) : (
        <Text style={editableAmount.amountStyles}>{`$ ${amount}`}</Text>
      )}
    </TouchableOpacity>
  )
}

const editableAmount = StyleSheet.create({
  amountView: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingVertical: 8
  },
  amountStyles: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  },
  textInput: {
    height: 19
  }
})

export default EditableAmount
