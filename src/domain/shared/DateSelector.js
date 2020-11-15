import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../shared/Button";
import DateRoller from "./DateRoller";
import renderSeparator from "./Separator";
import { fetchAllCategories } from "../../dbOperations/category/categoryBDTransactions";

import color from "../../utils/styles/color";

const DateSelector = (props) => {
  const { isModalVisible, onBackdropPress, onChange } = props;

  const [selectedDate, setSelectedDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });

  useEffect(() => {
    // console.log("selectedDate", selectedDate);
  }, [selectedDate]);

  const handleChangeDate = (date) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      ...date,
    }));
    // console.log("handleChangeDate", date);
  };

  const handlePressOk = () => {
    onChange(selectedDate);
  };

  return (
    <View>
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        onBackdropPress={onBackdropPress}
      >
        <View style={styles.viewModal}>
          <DateRoller selectedDate={selectedDate} onChange={handleChangeDate} />

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
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewModal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 250,
    padding: 16,
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

export default DateSelector;
