import React, { useState } from "react"
import { TextInput, StyleSheet } from "react-native"
import Feature from "../../atoms/Feature"

const DescriptionFeature = props => {
  const { description, onChange } = props

  const [_description, setDescription] = useState(description.value)
  const [editableElements, setEditatableElements] = useState({
    description: { isVisible: false }
  })

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

  return (
    <Feature
      name="descripción"
      value={_description}
      voidValue="sin descripción"
      isVisibleEditableElm={editableElements.description.isVisible}
      editableElement={
        <TextInput
          style={styles.descTextInput}
          value={_description}
          onChangeText={handleChangeDescription}
          onBlur={handleBlurInput}
          autoFocus
        />
      }
      onPressFeature={handlePressFeature}
      isVisibleEditableElm={editableElements.description.isVisible}
    />
  )
}

const styles = StyleSheet.create({
  descTextInput: {
    height: 20,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right"
  }
})

export default DescriptionFeature
