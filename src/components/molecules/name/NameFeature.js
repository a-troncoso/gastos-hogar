import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Keyboard } from "react-native";
import Feature from "../../atoms/Feature/Feature";

const NameFeature = props => {
  const {
    value,
    isUnsavedFeature,
    onChange,
    onChangeKeyboardVisibility = () => undefined,
  } = props;

  const [_value, _setValue] = useState(value);
  const [editableElements, setEditatableElements] = useState({
    value: { isVisible: false },
  });

  useEffect(() => {
    _setValue(value);
  }, [value]);

  const handleChangeValue = newValue => {
    _setValue(newValue);
  };

  const handleBlurInput = () => {
    setEditatableElements({
      ...editableElements,
      value: { isVisible: false },
    });

    onChange({ id: null, value: _value });
  };

  const handlePressFeature = () => {
    setEditatableElements({
      ...editableElements,
      value: { isVisible: true },
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

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  return (
    <Feature
      name="nombre"
      value={_value}
      voidValue="sin nombre"
      isVisibleEditableElm={editableElements.value.isVisible}
      editableElement={
        <TextInput
          style={styles.textInput}
          value={_value}
          onChangeText={handleChangeValue}
          onBlur={handleBlurInput}
          onSubmitEditing={Keyboard.dismiss}
          autoFocus
        />
      }
      isUnsavedFeature={isUnsavedFeature}
      isVisibleEditableElm={editableElements.value.isVisible}
      onPressFeature={handlePressFeature}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 20,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default NameFeature;
