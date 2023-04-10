import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, Dimensions } from "react-native";
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

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={isModalVisible}
        onRequestClose={onBackdropPress}
        transparent={true}
        statusBarTranslucent
        animationType="fade"
      >
        <View style={styles.viewModal}>
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // borderWidth: 1,
    // borderColor: "red",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: color.transparent.gray["130"]["90"],
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
  },
  viewModal: {
    // borderWidth: 1,
    // borderColor: "yellow",
    left: Dimensions.get("window").width / 2 - 150,
    top: Dimensions.get("window").height / 2 - 125,
    width: 300,
    height: 250,
    padding: 16,
    alignItems: "center",
    backgroundColor: color.blue["90"],
  },
  modalViewFooter: {
    marginTop: 16,
    flexDirection: "row",
  },
  saveBtnText: {
    fontWeight: "bold",
  },
});

export default DateModalSelector;
