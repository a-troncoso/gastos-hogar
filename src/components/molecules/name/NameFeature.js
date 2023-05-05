import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Keyboard } from "react-native";
import Feature from "../../atoms/Feature/Feature";

const NameFeature = props => {
  const {
    capitalizeValue = false,
    value,
    isUnsavedFeature,
    onChange = () => {},
    onChangeKeyboardVisibility = () => undefined,
  } = props;

  const [_value, _setValue] = useState(value);
  const [editableElements, setEditatableElements] = useState({
    value: { isVisible: false },
  });

  useEffect(() => {
    if (value !== _value) onChange({ value: _value });
  }, [_value]);

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

    if (value !== _value) onChange({ value: _value });
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
  }, []);

  return (
    <Feature
      name="nombre"
      value={_value}
      voidValue="sin nombre"
      isVisibleEditableElm={editableElements.value.isVisible}
      editableElement={
        <TextInput
          style={[styles.textInput, capitalizeValue && styles.capitalizeValue]}
          value={_value}
          onChangeText={handleChangeValue}
          onBlur={handleBlurInput}
          onSubmitEditing={Keyboard.dismiss}
          autoFocus
        />
      }
      isUnsavedFeature={isUnsavedFeature}
      onPressFeature={handlePressFeature}
      capitalizeValue={capitalizeValue}
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
  capitalizeValue: {
    textTransform: "capitalize",
  },
});

export default NameFeature;
