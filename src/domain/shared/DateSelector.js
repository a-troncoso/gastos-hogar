import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import Button from "../shared/Button";
import renderSeparator from "./Separator";
import { fetchAllCategories } from "../../dbOperations/category/categoryBDTransactions";

import color from "../../utils/styles/color";

const DateSelector = props => {
  const { isModalVisible, onBackdropPress, onChange } = props;

  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {}, [isModalVisible]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setDays(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]);
    setMonths([
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic"
    ]);
    setYears([
      "2015",
      "2015",
      "2015",
      "2015",
      "2015",
      "2015",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020"
    ]);
  };

  const handlePressOk = () => {
    // console.log(setDays)
    // console.log(setMonths)
    // console.log(setYears)
  };

  return (
    <View>
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        onBackdropPress={onBackdropPress}
      >
        <View style={styles.viewModal}>
          <View style={styles.viewLists}>
            <FlatList
              data={days}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator}
              renderItem={({ item }) => (
                <View style={styles.viewItem}>
                  <Text>{item}</Text>
                </View>
              )}
            ></FlatList>
            <FlatList
              data={months}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator}
              renderItem={({ item }) => (
                <View style={styles.viewItem}>
                  <Text>{item}</Text>
                </View>
              )}
            ></FlatList>
            <FlatList
              data={years}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator}
              renderItem={({ item }) => (
                <View style={styles.viewItem}>
                  <Text>{item}</Text>
                </View>
              )}
            ></FlatList>
          </View>

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
    justifyContent: "center"
  },
  viewModal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 250,
    padding: 16,
    backgroundColor: color.blue["90"]
  },
  viewLists: {
    flex: 1,
    flexDirection: "row"
  },
  viewItem: {
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "blue",

    flex: 1,
    height: 48,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  modalViewFooter: {
    marginTop: 16
  },
  saveBtnText: {
    fontWeight: "bold"
  }
});

export default DateSelector;
