import React, { useState } from "react"
import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import DateSelector from "../../atoms/DateModalSelector"
import color from "../../../utils/styles/color"
import { monthName } from "../../../utils/date"

const DateNavigatorActivator = props => {
  const { mode, date } = props

  const [isDatePickerVisible, setIsDatePickerVisible] = useState()

  const DayText = () => {
    return (
      <>
        <Text>20</Text>
        <View>
          <Text>Septiembre</Text>
          <Text>2020</Text>
        </View>
      </>
    )
  }

  const MonthText = ({ date }) => {
    return (
      <>
        <Text style={{ textTransform: "capitalize" }}>
          {monthName(date.getMonth())}
        </Text>
      </>
    )
  }

  const YearText = () => {
    return (
      <>
        <Text>2020</Text>
      </>
    )
  }

  const modes = date => ({
    DAY: <DayText date={date} />,
    MONTH: <MonthText date={date} />,
    YEAR: <YearText date={date} />
  })

  const handleOpenDatePicker = () => {
    setIsDatePickerVisible(true)
  }

  return (
    <>
      {isDatePickerVisible && <DateSelector />}
      <View style={dateNavigatorActivatorStyles.mainView}>
        <TouchableOpacity
          style={dateNavigatorActivatorStyles.activator}
          onPress={handleOpenDatePicker}
        >
          {modes(date)[mode]}
        </TouchableOpacity>
      </View>
    </>
  )
}

const dateNavigatorActivatorStyles = StyleSheet.create({
  mainView: {},
  activator: {
    width: 150,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: color.blue["30"],
    borderRadius: 8
  }
})

export default DateNavigatorActivator
