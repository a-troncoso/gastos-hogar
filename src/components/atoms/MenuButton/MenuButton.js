import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { DrawerActions } from "@react-navigation/native"

import { Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons"

import color from "../../../assets/colors"

const menu = {
  main: <Feather name="menu" size={24} color={color.black} />,
  secondary: (
    <MaterialCommunityIcons
      name="dots-vertical"
      size={24}
      color={color.black}
    />
  )
}

const MenuButton = props => {
  const { navigation, type, onPress } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <View style={menuButtonStyles.menuButtonIconView}>{menu[type]}</View>
    </TouchableOpacity>
  )
}

const menuButtonStyles = StyleSheet.create({
  menuButtonIconView: {
    padding: 16
  }
})

export default MenuButton
