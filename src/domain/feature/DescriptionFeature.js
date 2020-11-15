import React, { useState, useEffect } from "react"
import { TextInput, Keyboard } from "react-native"
import Feature from "./Feature"
import ModalSelector from "../category/ModalSelector"

const DescriptionFeature = props => {
  const { description, onChange } = props

  const [_description, setDescription] = useState(description.value)
  const [editableElements, setEditatableElements] = useState({
    description: { isVisible: false }
  })

  // useEffect(() => {
  //   Keyboard.addListener("keyboardDidShow", _keyboardDidShow)

  //   return () => {
  //     Keyboard.removeListener("keyboardDidShow", _keyboardDidShow)
  //   }
  // }, [])

  // const _keyboardDidShow = e => {
  //   const { height, screenX, screenY, width } = e.endCoordinates
  //   console.log(height)
  // }

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
          style={{ backgroundColor: "red" }}
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

export default DescriptionFeature
