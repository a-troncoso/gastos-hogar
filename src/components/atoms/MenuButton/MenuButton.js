import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { DrawerActions } from "@react-navigation/native"

import { Feather } from "@expo/vector-icons"

import color from "../../../utils/styles/color"

const MenuButton = props => {
  const { navigation } = props

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <View style={menuButtonStyles.menuButtonIconView}>
        <Feather name="menu" size={24} color={color.black} />
      </View>
    </TouchableOpacity>
  )
}

const menuButtonStyles = StyleSheet.create({
  menuButtonIconView: {
    padding: 16
  }
})

export default MenuButton
