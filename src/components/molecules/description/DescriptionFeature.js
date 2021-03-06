import React, { useState, useEffect } from "react"
import { TextInput, StyleSheet, Keyboard } from "react-native"
import Feature from "../../atoms/Feature/Feature"

const DescriptionFeature = props => {
  const {
    description,
    isUnsavedFeature,
    isFocusedInput,
    onChange,
    onChageKeyboardVisibility
  } = props

  const [_description, setDescription] = useState(description)
  const [editableElements, setEditatableElements] = useState({
    description: { isVisible: false }
  })
  const [inputHeight, setInputHeight] = useState(0)

  useEffect(() => {}, [isUnsavedFeature])

  useEffect(() => {
    setDescription(description)
  }, [description])

  const handleChangeDescription = descriptionText => {
    setDescription(descriptionText)
  }

  const handleBlurInput = () => {
    setEditatableElements({
      ...editableElements,
      description: { isVisible: false }
    })

    onChange({ id: null, value: _description })
  }

  const handlePressFeature = () => {
    setEditatableElements({
      ...editableElements,
      description: { isVisible: true }
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
      name="descripción"
      value={_description}
      voidValue="sin descripción"
      isVisibleEditableElm={editableElements.description.isVisible}
      editableElement={
        <TextInput
          style={{ ...styles.descTextInput, height: inputHeight }}
          value={_description}
          onChangeText={handleChangeDescription}
          onBlur={handleBlurInput}
          onSubmitEditing={Keyboard.dismiss}
          onContentSizeChange={event => {
            setInputHeight(event.nativeEvent.contentSize.height)
          }}
          multiline
          autoFocus
        />
      }
      isUnsavedFeature={isUnsavedFeature}
      onPressFeature={handlePressFeature}
      isVisibleEditableElm={editableElements.description.isVisible}
    />
  )
}

const styles = StyleSheet.create({
  descTextInput: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",

    height: 20,
    width: "60%",
    paddingVertical: 1,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right"
  }
})

export default DescriptionFeature
