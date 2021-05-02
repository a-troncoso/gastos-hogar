import React, { useEffect, useState, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import ScrollPicker from "react-native-wheel-scrollview-picker"

import { daysInMonth, monthNames, availableYears } from "../../../utils/date"

import color from "../../../assets/colors"

const DateRoller = props => {
  const { date, mode = "DAY", onChange } = props

  const daysDataSource = daysInMonth()
  const monthsDataSource = monthNames()("short")
  const yearsDataSource = availableYears()

  const scrollPickerProps = {
    wrapperHeight: 180,
    wrapperWidth: 150,
    wrapperBackground: color.blue["90"],
    itemTextStyle: styles.viewItemText,
    activeItemTextStyle: styles.viewItemSelectedText,
    itemHeight: 50,
    highlightColor: color.gray["100"],
    highlightBorderWidth: 1
  }

  const handleChangeScrollPicker = (scrollName, value) => {
    let newSelectedDate = new Date(date)

    const updateDatebyScrollName = {
      day: () => newSelectedDate.setDate(value),
      month: () => newSelectedDate.setMonth(value),
      year: () => newSelectedDate.setFullYear(value)
    }

    updateDatebyScrollName[scrollName]()
    onChange(newSelectedDate)
  }

  const indexInScroll = (scrollName, list) =>
    ({
      day: list.indexOf(date.getDate()),
      month: date.getMonth(),
      year: list.indexOf(date.getFullYear())
    }[scrollName])

  return (
    <View style={styles.viewLists}>
      {mode === "DAY" && (
        <ScrollPicker
          {...scrollPickerProps}
          dataSource={daysDataSource}
          onValueChange={data => {
            handleChangeScrollPicker("day", data)
          }}
          selectedIndex={indexInScroll("day", daysDataSource)}
        />
      )}
      <ScrollPicker
        {...scrollPickerProps}
        dataSource={monthsDataSource}
        onValueChange={(data, selectedIndex) => {
          handleChangeScrollPicker("month", selectedIndex)
        }}
        selectedIndex={indexInScroll("month", monthsDataSource)}
      />
      <ScrollPicker
        {...scrollPickerProps}
        dataSource={yearsDataSource}
        onValueChange={data => {
          handleChangeScrollPicker("year", data)
        }}
        selectedIndex={indexInScroll("year", yearsDataSource)}
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
