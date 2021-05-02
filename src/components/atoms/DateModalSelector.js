import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import Modal from "react-native-modal"
import Button from "./Button"
import DateRoller from "../molecules/date/DateRoller"

import color from "../../assets/colors"

const DateModalSelector = props => {
  const { date, mode, isModalVisible, onChange, onBackdropPress } = props

  const [selectedDate, setSelectedDate] = useState(date)

  const handleChangeDate = date => {
    setSelectedDate(date)
  }

  const handlePressOk = () => {
    onChange(selectedDate)
  }

  return (
    <View>
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        onBackdropPress={onBackdropPress}
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
  )
}

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
  modalViewFooter: {
    marginTop: 16,
    flexDirection: "row"
  },
  saveBtnText: {
    fontWeight: "bold"
  }
})

export default DateModalSelector
