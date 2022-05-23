import React, { useState } from "react";
import {
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";

import MenuButton from "./MenuButton/MenuButton";

const Picker = props => {
  const { onPressItem } = props;
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [removeState, setRemoveState] = useState(1);

  const handlePressMenu = () => {
    setIsContentVisible(!isContentVisible);
    setRemoveState(1);
  };

  const handlePressItem = (action, conf) => {
    if (conf.withConfirmation) {
      if (conf.confirmationState === 2) {
        onPressItem(action);
        setIsContentVisible(false);
      } else if (conf.confirmationState === 1) setRemoveState(2);
    }
  };

  return (
    <>
      <View style={styles.pickerView}>
        <MenuButton type="secondary" onPress={handlePressMenu} />
      </View>
      {isContentVisible && (
        <View style={[styles.contentView, styles[`removeState${removeState}`]]}>
          <TouchableOpacity
            onPress={() =>
              handlePressItem("REMOVE_EXPENSE", {
                withConfirmation: true,
                confirmationState: removeState,
              })
            }
          >
            <Text
              style={[styles.itemText, styles[`removeState${removeState}`]]}
            >
              Eliminar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pickerView: {
    position: "relative",
  },
  contentView: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    position: "absolute",
    right: 8,
    width: 120,
    top: 40,
    // height: 480,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  removeState1: {
    // backgroundColor: "#fff",
    // borderColor: "blue",
    // borderWidth: 1,
    borderStyle: "solid",
  },
  removeState2: { backgroundColor: "red", color: "#fff" },
});

export default Picker;
