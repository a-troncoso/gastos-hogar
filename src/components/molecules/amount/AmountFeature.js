import React, { useState, useEffect } from "react"
import { TextInput, StyleSheet, Keyboard } from "react-native"

import Feature from "../../atoms/Feature/Feature"

import { extractNumbers, number_format } from "../../../utils/number"

const AmountFeature = props => {
  const {
    value,
    isUnsavedFeature,
    valuePrefix,
    onChange = () => undefined,
    onChageKeyboardVisibility = () => undefined
  } = props

  const [_value, _setValue] = useState(value)
  const [editableElements, setEditatableElements] = useState({
    value: { isVisible: false }
  })

  useEffect(() => {
    const valueFormattedInThousand = number_format(
      extractNumbers(value),
      0,
      ",",
      "."
    )
    _setValue(valueFormattedInThousand)
  }, [value])

  const handleChangeValue = value => {
    const valueFormattedInThousand = number_format(
      extractNumbers(value),
      0,
      ",",
      "."
    )
    _setValue(valueFormattedInThousand)
  }

  const handleBlurInput = () => {
    setEditatableElements({
      ...editableElements,
      value: { isVisible: false }
    })

    onChange({ id: null, value: _value })
  }

  const handlePressFeature = () => {
    setEditatableElements({
      ...editableElements,
      value: { isVisible: true }
    })
  }

  const _keyboardDidShow = () => {
    onChageKeyboardVisibility({ isKeyboardVisible: true })
  }

  const _keyboardDidHide = () => {
    onChageKeyboardVisibility({ isKeyboardVisible: false })
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow)
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide)

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow)
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide)
    }
  }, [])

  return (
    <Feature
      name="cuota mensual"
      value={_value}
      voidValue="0"
      isVisibleEditableElm={editableElements.value.isVisible}
      editableElement={
        <TextInput
          style={styles.textInput}
          value={_value}
          keyboardType="numeric"
          onChangeText={handleChangeValue}
          onBlur={handleBlurInput}
          onSubmitEditing={Keyboard.dismiss}
          autoFocus
        />
      }
      isUnsavedFeature={isUnsavedFeature}
      isVisibleEditableElm={editableElements.value.isVisible}
      prefix={valuePrefix}
      onPressFeature={handlePressFeature}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 20,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right"
  }
})

export default AmountFeature
