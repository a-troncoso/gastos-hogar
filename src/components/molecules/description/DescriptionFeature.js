import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Keyboard } from "react-native";
import Feature from "../../atoms/Feature/Feature";

const DescriptionFeature = props => {
  const {
    description,
    isUnsavedFeature,
    isFocusedInput,
    onChange,
    onChangeKeyboardVisibility,
  } = props;

  const [localDescription, setLocalDescription] = useState(description);
  const [editableElements, setEditatableElements] = useState({
    description: { isVisible: false },
  });
  const [inputHeight, setInputHeight] = useState(0);

  useEffect(() => {}, [isUnsavedFeature]);

  useEffect(() => {
    setLocalDescription(description);
  }, [description]);

  const handleChangeDescription = descriptionText => {
    setLocalDescription(descriptionText);
  };

  const handleBlurInput = () => {
    setEditatableElements({
      ...editableElements,
      description: { isVisible: false },
    });

    if (description !== localDescription)
      onChange({ id: null, value: localDescription });
  };

  const handlePressFeature = () => {
    setEditatableElements({
      ...editableElements,
      description: { isVisible: true },
    });
  };

  const _keyboardDidShow = () => {
    onChangeKeyboardVisibility({ isKeyboardVisible: true });
  };

  const _keyboardDidHide = () => {
    onChangeKeyboardVisibility({ isKeyboardVisible: false });
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  }, []);

  return (
    <Feature
      name="descripción"
      value={localDescription}
      voidValue="sin descripción"
      isVisibleEditableElm={editableElements.description.isVisible}
      editableElement={
        <TextInput
          style={{ ...styles.descTextInput, height: inputHeight }}
          value={localDescription}
          onChangeText={handleChangeDescription}
          onBlur={handleBlurInput}
          onSubmitEditing={Keyboard.dismiss}
          onContentSizeChange={event => {
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
          multiline
          autoFocus
        />
      }
      isUnsavedFeature={isUnsavedFeature}
      onPressFeature={handlePressFeature}
    />
  );
};

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
    textAlign: "right",
  },
});

export default DescriptionFeature;
