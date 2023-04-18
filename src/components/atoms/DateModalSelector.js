import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
} from "react-native";
import Button from "./Button";
import DateRoller from "../molecules/date/DateRoller";

import color from "../../assets/colors";

const DateModalSelector = props => {
  const { date, mode, isModalVisible, onChange, onBackdropPress } = props;

  const [selectedDate, setSelectedDate] = useState(date);

  const handleChangeDate = date => {
    setSelectedDate(date);
  };

  const handlePressOk = () => {
    onChange(selectedDate);
  };

  const handleBackdropPress = () => {
      onBackdropPress();
  };


  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={isModalVisible}
        animationType="fade"
        transparent
        statusBarTranslucent
        onRequestClose={onBackdropPress}
      >
        <View
          style={styles.viewModal}
          onPress={handleBackdropPress}
        >
          <View style={styles.modalBox} >
            <DateRoller
              date={selectedDate}
              mode={mode}
              onChange={handleChangeDate}
            />
            <View style={styles.modalViewFooter}>
              <Button onPress={handlePressOk}>
                <Text style={styles.saveBtnText}>OK</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {},
  viewModal: {
    // borderWidth: 1,
    // borderColor: "yellow",
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.transparent.gray["130"]["90"],
  },
  modalBox: {
    // borderWidth: 1,
    // borderColor: "red",
    backgroundColor: color.gray["0"],
    width: 300,
    padding: 16,
  },
  modalViewFooter: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  saveBtnText: {
    fontWeight: "bold",
  },
});

export default DateModalSelector;
