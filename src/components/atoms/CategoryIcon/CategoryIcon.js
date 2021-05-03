import React from "react"
import { StyleSheet, View } from "react-native"

import { FontAwesome } from "@expo/vector-icons"

import color from "../../../assets/colors"

const CategoryIcon = props => {
  const { iconName } = props

  return (
    <View style={categoryIconStyles.categoryIcon}>
      <FontAwesome name={iconName} size={36} color={color.gray["0"]} />
    </View>
  )
}

const categoryIconStyles = StyleSheet.create({
  categoryIcon: {
    // borderColor: "lime",
    // borderWidth: 1,
    // borderStyle: "solid",

    // height: "100%",
    width: 72,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: color.blue["0"]
  }
})

export default CategoryIcon
