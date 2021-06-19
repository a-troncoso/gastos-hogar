import React, { useState, useEffect } from "react"
import Feature from "../../atoms/Feature/Feature"
import DateModalSelector from "../../atoms/DateModalSelector"

import { formatDate, formatHour } from "../../../utils/date"

const DateFeature = props => {
  const { date, isUnsavedFeature, onChange } = props

  const [isEditableElementVisible, setIdEditatableElementVisible] = useState(
    false
  )

  const handleSelectDate = date => {
    setIdEditatableElementVisible(false)
    onChange(date)
  }

  return (
    <Feature
      name="fecha"
      value={formatDate(date, { withMonthName: true })}
      voidValue="sin registrar"
      isVisibleEditableElm={isEditableElementVisible}
      editableElement={
        <DateModalSelector
          date={date}
          isModalVisible={isEditableElementVisible}
          onBackdropPress={() => setIdEditatableElementVisible(false)}
          onChange={date => handleSelectDate(date)}
        />
      }
      isUnsavedFeature={isUnsavedFeature}
      onPressFeature={() => setIdEditatableElementVisible(true)}
    />
  )
}

export default DateFeature
