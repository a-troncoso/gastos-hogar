import React, { useState, useEffect } from "react"
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native"
import Feature from "../feature/Feature"
import { useHeaderHeight } from "@react-navigation/stack"

import color from "../../utils/styles/color"

const DescriptionFeature = props => {
  const { description, onChange } = props

  const [_description, setDescription] = useState(description.value)
  const [editableElements, setEditatableElements] = useState({
    description: { isVisible: false }
  })
  const headerHeight = useHeaderHeight()

  const handleChangeDescription = desc => {
    console.log(desc)
    // FIXME: Setear correctamente el string que se debe formar
    setDescription(`${_description}${desc}`)
  }

  const handleBlurInput = () => {
    setEditatableElements({
      ...editableElements,
      description: { isVisible: false }
    })

    onChange({ id: null, value: _description })
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
          value={description.value}
          autoFocus
          onChangeText={handleChangeDescription}
          onBlur={handleBlurInput}
        />
      }
      onPressFeature={() =>
        setEditatableElements({
          ...editableElements,
          description: { isVisible: true }
        })
      }
      isVisibleEditableElm={editableElements.description.isVisible}
    />
  )
}

const styles = StyleSheet.create({
  descTextInput: {
    height: 20,
    fontSize: 14,
    textAlign: "right"
  }
})

export default DescriptionFeature
