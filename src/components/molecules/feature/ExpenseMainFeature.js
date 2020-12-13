import React from "react"
import { StyleSheet, View, TouchableHighlight } from "react-native"
import EditableAmount from "../../atoms/amount/EditableAmount"
import ExpenseCamera from '../../atoms/Camera'

import color from "../../../utils/styles/color"


const ExpenseMainFeature = props => {
  const { amount, onPressCamera, onChange, onBlurEditableAmount } = props

  const handleChangeEditableAmount = e => {
    onChange(e)
  }

  const handleBlurEditableAmount = () => {
    onBlurEditableAmount()
  }

  return (
    <View style={expenseMainInfo.view}>
      <View style={expenseMainInfo.expenseCameraView}>
        <TouchableHighlight
          style={expenseMainInfo.cameraTouchable}
          onPress={() => onPressCamera()}
        >
          <ExpenseCamera />
        </TouchableHighlight>
      </View>
      <EditableAmount
        amount={amount.value}
        editedAmount={amount.newValue}
        onChange={handleChangeEditableAmount}
        onBlur={handleBlurEditableAmount}
      />
    </View>
  )
}

const expenseMainInfo = StyleSheet.create({
  view: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    width: 136,
    height: 224,
    flexDirection: "column",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: color.gray["0"],
    shadowColor: color.gray["50"],
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6
  },
  expenseCameraView: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1
  },

  amount: {
    color: "red",
    borderStyle: "solid",
    textAlign: "center",
    fontWeight: "bold"
  },
  cameraTouchable: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1
  }
})

export default ExpenseMainFeature
