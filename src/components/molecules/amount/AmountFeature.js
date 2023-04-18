import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Keyboard } from "react-native";

import Feature from "../../atoms/Feature/Feature";

import {
  extractNumbers,
  numberFormat,
  thousandFormat,
} from "../../../utils/number";

const AmountFeature = props => {
  const {
    name,
    value,
    isUnsavedFeature,
    valuePrefix,
    onChange = () => undefined,
    onChangeKeyboardVisibility = () => undefined,
  } = props;

  const [_value, _setValue] = useState(value);
  const [editableElements, setEditatableElements] = useState({
    value: { isVisible: false },
  });

  useEffect(() => {
    const valueFormattedInThousand = thousandFormat(
      extractNumbers(value),
      0,
      ",",
      "."
    );
    _setValue(valueFormattedInThousand);
  }, [value]);

  const handleChangeValue = value => {
    const valueFormattedInThousand = thousandFormat(
      extractNumbers(value),
      0,
      ",",
      "."
    );
    _setValue(valueFormattedInThousand);
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
      name={name}
      value={_value}
      voidValue="0"
      isVisibleEditableElm={editableElements.value.isVisible}
      editableElement={
        <TextInput
          style={styles.textInput}
          value={_value + ""}
          keyboardType="numeric"
          onChangeText={handleChangeValue}
          onBlur={handleBlurInput}
          onSubmitEditing={Keyboard.dismiss}
          autoFocus
        />
      }
      isUnsavedFeature={isUnsavedFeature}
      prefix={valuePrefix}
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

export default AmountFeature;
