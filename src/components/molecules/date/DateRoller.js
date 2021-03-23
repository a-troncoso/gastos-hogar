import React, { useEffect, useState, useCallback } from "react"
import { StyleSheet, View, FlatList, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import InfiniteScroll from "../../atoms/InfiniteScroll"
import ScrollPicker from "react-native-wheel-scrollview-picker"

import shortid from "shortid"

import { daysInMonth, monthNames, availableYears } from "../../../utils/date"

import color from "../../../utils/styles/color"

const topLinearGradientColors = [
  color.blue["90"],
  `${color.transparent.blue["90"]["90"]}`,
  `${color.transparent.blue["90"]["30"]}`
]
const bottomLinearGradientColors = [
  `${color.transparent.blue["90"]["30"]}`,
  `${color.transparent.blue["90"]["90"]}`,
  color.blue["90"]
]

const DateRoller = props => {
  const { selectedDate, onChange } = props

  const [days, setDays] = useState([])
  const [months, setMonths] = useState([])
  const [years, setYears] = useState([])
  const selectedDayIndex = useCallback(() => {
    console.log(
      "days.findIndex(day => day == selectedDate.getDate())",
      days.findIndex(day => day == selectedDate.getDate())
    )
    return days.findIndex(day => day == selectedDate.getDate())
  }, [selectedDate, days])

  useEffect(() => {
    genCalendarData()
  }, [])

  const genCalendarData = () => {
    setDays(daysInMonth())
    setMonths(monthNames()("short"))
    setYears(availableYears())
  }

  const scrollPickerProps = {
    renderItem: data => {},
    onValueChange: (data, selectedIndex) => {
      console.log("data", data, "selectedIndex", selectedIndex)
    },
    wrapperHeight: 180,
    wrapperWidth: 150,
    wrapperBackground: color.blue["90"],
    itemTextStyle: styles.viewItemText,
    activeItemTextStyle: styles.viewItemSelectedText,
    itemHeight: 50,
    highlightColor: color.gray["100"],
    highlightBorderWidth: 1
  }

  const find = dayToFind => {
    console.log("dayToFind", dayToFind)
    return days.findIndex(day => day == dayToFind)
  }

  useEffect(() => {}, [])

  useEffect(() => {
    // console.log("find(selectedDate.getDate()", find(selectedDate.getDate()))
  }, [days, selectedDate])

  return (
    <View style={styles.viewLists}>
      {<ScrollPicker
        {...scrollPickerProps}
        dataSource={days}
        selectedIndex={selectedDayIndex()}
        fontSize={16}
      />}
      <ScrollPicker
        {...scrollPickerProps}
        dataSource={months}
        selectedIndex={1}
      />
      <ScrollPicker
        {...scrollPickerProps}
        dataSource={years}
        selectedIndex={1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewLists: {
    flex: 1,
    flexDirection: "row"
  },
  topLinearGradient: {
    position: "absolute",
    height: "25%",
    width: "100%",
    zIndex: 100
  },
  viewItemText: {
    color: color.gray["80"]
  },
  viewItemSelectedText: {
    color: color.gray["110"]
  },
  bottomLinearGradient: {
    position: "absolute",
    height: "25%",
    width: "100%",
    zIndex: 100,
    bottom: 0
  }
})

export default DateRoller
